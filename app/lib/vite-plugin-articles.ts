/**
 * A Vite plugin that processes Markdown article files during build.
 * It:
 * 1. Finds all .md files in the articles directory
 * 2. Parses each file's frontmatter metadata and content
 * 3. Validates the frontmatter against a schema
 * 4. Filters for published articles only
 * 5. Sorts articles by date (newest first)
 * 6. Writes the processed articles to a JSON file for use in the app
 */

import type { Plugin } from 'vite'
import { glob } from 'glob'
import * as fs from 'fs/promises'
import markdoc from '@markdoc/markdoc'
import yaml from 'js-yaml'
import { FrontmatterZ } from './types'

export function articlesPlugin(): Plugin {
  return {
    name: 'vite-plugin-articles',
    async buildStart() {
      // Find all .md files in the articles directory
      const files = await glob('articles/*.md')
      const articles = await Promise.all(
        files.map(async (file) => {
          const content = await fs.readFile(file, 'utf-8')
          
          // Parse the markdown content
          const ast = markdoc.parse(content)
          const frontmatterRaw = ast.attributes.frontmatter
            ? yaml.load(ast.attributes.frontmatter)
            : {}
          
          // Validate frontmatter
          const frontmatter = FrontmatterZ.parse(frontmatterRaw)
          
          return {
            ...frontmatter,
            content,
          }
        })
      )

      // Sort articles by date
      const sortedArticles = articles
        .filter(article => article.published)
        .sort((a, z) => +new Date(z.date) - +new Date(a.date))

      // Write to JSON file
      await fs.writeFile(
        'app/articles.json',
        JSON.stringify(sortedArticles, null, 2)
      )
    },
    configureServer(server) {
      // Watch for changes to markdown files
      server.watcher.add('articles/*.md')
      server.watcher.on('change', (file) => {
        if (file.endsWith('.md')) {
          // Trigger rebuild when markdown files change
          server.restart()
        }
      })
    }
  }
} 