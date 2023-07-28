import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { EMarkdown, useRender } from 'src'

describe('Markdown component renders correctly', () => {
  it('renders the markdown in the correct format for browsers', async () => {
    const component = h(EMarkdown, {
      source: `# This is a ~~chair~~ Table
| Heading 1 | Heading 2 |
| --------- | --------- |
| Cell 1    | Cell 2    |
| Cell 3    | Cell 4    |
`,
    })

    const actualOutput = await useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><div data-id=\\"__vue-email-markdown\\" style=\\"\\"><h1 data-id=\\"vue-email-heading\\" style=\\"font-weight:500;padding-top:20;font-size:2.5rem\\">This is a <del>chair</del> Table</h1><table><thead><tr><th align=\\"center\\">Heading 1</th><th align=\\"center\\">Heading 2</th></tr></thead><tbody><tr><td align=\\"center\\">Cell 1</td><td align=\\"center\\">Cell 2</td></tr><tr><td align=\\"center\\">Cell 3</td><td align=\\"center\\">Cell 4</td></tr></tbody></table></div>"',
    )
  })

  it('renders the headers in the correct format for browsers', async () => {
    const component = h(EMarkdown, {
      source: `
# Heading 1!
## Heading 2!
### Heading 3!
#### Heading 4!
##### Heading 5!
###### Heading 6!
`,
    })

    const actualOutput = await useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      `"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><div data-id=\\"__vue-email-markdown\\" style=\\"\\">
<h1 data-id=\\"vue-email-heading\\" style=\\"font-weight:500;padding-top:20;font-size:2.5rem\\">Heading 1!</h1>
<h2 data-id=\\"vue-email-heading\\" style=\\"font-weight:500;padding-top:20;font-size:2rem\\">Heading 2!</h2>
<h3 data-id=\\"vue-email-heading\\" style=\\"font-weight:500;padding-top:20;font-size:1.75rem\\">Heading 3!</h3>
<h4 data-id=\\"vue-email-heading\\" style=\\"font-weight:500;padding-top:20;font-size:1.5rem\\">Heading 4!</h4>
<h5 data-id=\\"vue-email-heading\\" style=\\"font-weight:500;padding-top:20;font-size:1.25rem\\">Heading 5!</h5>
<h6 data-id=\\"vue-email-heading\\" style=\\"font-weight:500;padding-top:20;font-size:1rem\\">Heading 6!</h6>
</div>"`,
    )
  })

  it('renders text in the correct format for browsers', async () => {
    const component = h(EMarkdown, {
      source: '**This is sample bold text in markdown** and *this is italic text*',
    })

    const actualOutput = await useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><div data-id=\\"__vue-email-markdown\\" style=\\"\\"><strong data-id=\\"vue-email-text\\" style=\\"font-weight:bold\\">This is sample bold text in markdown</strong> and <em data-id=\\"vue-email-text\\" style=\\"font-style:italic\\">this is italic text</em></div>"',
    )
  })

  it('renders links in the correct format for browsers', async () => {
    const component = h(EMarkdown, {
      source: 'Link to [Vue`-email](https://vue-email.vercel.app/)',
    })

    const actualOutput = await useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      '"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><div data-id=\\"__vue-email-markdown\\" style=\\"\\"><p data-id=\\"vue-email-text\\">Link to <a href=\\"https://vue-email.vercel.app/\\" style=\\"color:#007bff;text-decoration:underline;background-color:transparent\\" data-id=\\"vue-email-link\\" target=\\"_blank\\">Vue`-email</a></p></div>"',
    )
  })

  it('renders lists in the correct format for browsers', async () => {
    const component = h(EMarkdown, {
      source: `
# Below is a list

- Item One
- Item Two
- Item Three
`,
    })

    const actualOutput = await useRender(component)

    expect(actualOutput).toMatchInlineSnapshot(
      `"<!DOCTYPE html PUBLIC \\"-//W3C//DTD XHTML 1.0 Transitional//EN\\" \\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\\"><div data-id=\\"__vue-email-markdown\\" style=\\"\\">
<h1 data-id=\\"vue-email-heading\\" style=\\"font-weight:500;padding-top:20;font-size:2.5rem\\">Below is a list</h1>
<ul><li>Item One</li>
<li>Item Two</li>
<li>Item Three</li></ul>
</div>"`,
    )
  })
})
