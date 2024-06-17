import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { CodeBlock } from "./index";

const stringSnapshotSerializer = {
  serialize(val: any) {
    return val
  },
  test(val: any) {
    return (typeof val == 'string')
  },
}
expect.addSnapshotSerializer(stringSnapshotSerializer)


describe('<CodeBlock> component', () => {
  it('renders the Code Block component', async () => {
    const component = h(CodeBlock, {
      code: `import { codeToThemedTokens } from 'shiki'

      const tokens = await codeToThemedTokens('<div class="foo">bar</div>', {
        lang: 'html',
        theme: 'min-dark'
      })`,
      lang: 'typescript',
      theme: 'dracula',
    })

    const actualOutput = await render(component)

    expect(actualOutput).toMatchInlineSnapshot(
      `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><pre class="shiki dracula" style="background-color:#282A36;display:block;white-space:pre;font-family:monospace;" tabindex="0"><span><pre class="shiki dracula" style="background-color:#282A36;color:#F8F8F2" tabindex="0"><code style="display: table; width: 100%;"><span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#FF79C6">import</span><span style="color:#F8F8F2"> { codeToThemedTokens } </span><span style="color:#FF79C6">from</span><span style="color:#E9F284"> '</span><span style="color:#F1FA8C">shiki</span><span style="color:#E9F284">'</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#FF79C6">      const</span><span style="color:#F8F8F2"> tokens </span><span style="color:#FF79C6">=</span><span style="color:#FF79C6"> await</span><span style="color:#50FA7B"> codeToThemedTokens</span><span style="color:#F8F8F2">(</span><span style="color:#E9F284">'</span><span style="color:#F1FA8C">&#x3C;div class="foo">bar&#x3C;/div></span><span style="color:#E9F284">'</span><span style="color:#F8F8F2">, {</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#F8F8F2">        lang</span><span style="color:#FF79C6">:</span><span style="color:#E9F284"> '</span><span style="color:#F1FA8C">html</span><span style="color:#E9F284">'</span><span style="color:#F8F8F2">,</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#F8F8F2">        theme</span><span style="color:#FF79C6">:</span><span style="color:#E9F284"> '</span><span style="color:#F1FA8C">min-dark</span><span style="color:#E9F284">'</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#F8F8F2">      })</span></span></code></pre></span></pre>`,
    )
  })

  it('renders the Code Block with line numbers', async () => {
    const component = h(CodeBlock, {
      'code': `import { codeToThemedTokens } from 'shiki'

      const tokens = await codeToThemedTokens('<div class="foo">bar</div>', {
        lang: 'html',
        theme: 'min-dark'
      })`,
      'lang': 'typescript',
      'theme': 'dracula',
      'show-line-numbers': true,
    })

    const actualOutput = await render(component)

    expect(actualOutput).toMatchInlineSnapshot(
      `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><pre class="shiki dracula" style="background-color:#282A36;display:block;white-space:pre;font-family:monospace;" tabindex="0"><span><pre class="shiki dracula" style="background-color:#282A36;color:#F8F8F2" tabindex="0"><code style="display: table; width: 100%;"><span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span class="line-number" style="padding-left: 5px; padding-right: 15px; color: #636E7B; user-select: none;">1</span><span style="color:#FF79C6">import</span><span style="color:#F8F8F2"> { codeToThemedTokens } </span><span style="color:#FF79C6">from</span><span style="color:#E9F284"> '</span><span style="color:#F1FA8C">shiki</span><span style="color:#E9F284">'</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span class="line-number" style="padding-left: 5px; padding-right: 15px; color: #636E7B; user-select: none;">2</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span class="line-number" style="padding-left: 5px; padding-right: 15px; color: #636E7B; user-select: none;">3</span><span style="color:#FF79C6">      const</span><span style="color:#F8F8F2"> tokens </span><span style="color:#FF79C6">=</span><span style="color:#FF79C6"> await</span><span style="color:#50FA7B"> codeToThemedTokens</span><span style="color:#F8F8F2">(</span><span style="color:#E9F284">'</span><span style="color:#F1FA8C">&#x3C;div class="foo">bar&#x3C;/div></span><span style="color:#E9F284">'</span><span style="color:#F8F8F2">, {</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span class="line-number" style="padding-left: 5px; padding-right: 15px; color: #636E7B; user-select: none;">4</span><span style="color:#F8F8F2">        lang</span><span style="color:#FF79C6">:</span><span style="color:#E9F284"> '</span><span style="color:#F1FA8C">html</span><span style="color:#E9F284">'</span><span style="color:#F8F8F2">,</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span class="line-number" style="padding-left: 5px; padding-right: 15px; color: #636E7B; user-select: none;">5</span><span style="color:#F8F8F2">        theme</span><span style="color:#FF79C6">:</span><span style="color:#E9F284"> '</span><span style="color:#F1FA8C">min-dark</span><span style="color:#E9F284">'</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span class="line-number" style="padding-left: 5px; padding-right: 15px; color: #636E7B; user-select: none;">6</span><span style="color:#F8F8F2">      })</span></span></code></pre></span></pre>`,
    )
  })

  it('renders the Code Block with highlighted lines', async () => {
    const component = h(CodeBlock, {
      'code': `import { codeToThemedTokens } from 'shiki'

      const tokens = await codeToThemedTokens('<div class="foo">bar</div>', {
        lang: 'html',
        theme: 'min-dark'
      })`,
      'lang': 'typescript',
      'theme': 'dracula',
      'highlighted-lines': [4, 5],
    })

    const actualOutput = await render(component)

    expect(actualOutput).toMatchInlineSnapshot(
      `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><pre class="shiki dracula" style="background-color:#282A36;display:block;white-space:pre;font-family:monospace;" tabindex="0"><span><pre class="shiki dracula" style="background-color:#282A36;color:#F8F8F2" tabindex="0"><code style="display: table; width: 100%;"><span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#FF79C6">import</span><span style="color:#F8F8F2"> { codeToThemedTokens } </span><span style="color:#FF79C6">from</span><span style="color:#E9F284"> '</span><span style="color:#F1FA8C">shiki</span><span style="color:#E9F284">'</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#FF79C6">      const</span><span style="color:#F8F8F2"> tokens </span><span style="color:#FF79C6">=</span><span style="color:#FF79C6"> await</span><span style="color:#50FA7B"> codeToThemedTokens</span><span style="color:#F8F8F2">(</span><span style="color:#E9F284">'</span><span style="color:#F1FA8C">&#x3C;div class="foo">bar&#x3C;/div></span><span style="color:#E9F284">'</span><span style="color:#F8F8F2">, {</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;background-color: rgba(101, 117, 133, .16);"><span style="color:#F8F8F2">        lang</span><span style="color:#FF79C6">:</span><span style="color:#E9F284"> '</span><span style="color:#F1FA8C">html</span><span style="color:#E9F284">'</span><span style="color:#F8F8F2">,</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;background-color: rgba(101, 117, 133, .16);"><span style="color:#F8F8F2">        theme</span><span style="color:#FF79C6">:</span><span style="color:#E9F284"> '</span><span style="color:#F1FA8C">min-dark</span><span style="color:#E9F284">'</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#F8F8F2">      })</span></span></code></pre></span></pre>`,
    )
  })

  it('renders the Code Block with different theme and language', async () => {
    const component = h(CodeBlock, {
      code: `:root {
        --shiki-foreground: #eeeeee;
        --shiki-background: #333333;
        --shiki-token-constant: #660000;
        --shiki-token-string: #770000;
        --shiki-token-comment: #880000;
        --shiki-token-keyword: #990000;
        --shiki-token-parameter: #aa0000;
        --shiki-token-function: #bb0000;
        --shiki-token-string-expression: #cc0000;
        --shiki-token-punctuation: #dd0000;
        --shiki-token-link: #ee0000;
      }`,
      lang: 'css',
      theme: 'vitesse-dark',
    })

    const actualOutput = await render(component)

    expect(actualOutput).toMatchInlineSnapshot(
      `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><pre class="shiki vitesse-dark" style="background-color:#121212;display:block;white-space:pre;font-family:monospace;" tabindex="0"><span><pre class="shiki vitesse-dark" style="background-color:#121212;color:#dbd7caee" tabindex="0"><code style="display: table; width: 100%;"><span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#666666">:</span><span style="color:#BD976A">root</span><span style="color:#666666"> {</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#BD976A">        --shiki-foreground</span><span style="color:#666666">:</span><span style="color:#666666"> #</span><span style="color:#C99076">eeeeee</span><span style="color:#666666">;</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#BD976A">        --shiki-background</span><span style="color:#666666">:</span><span style="color:#666666"> #</span><span style="color:#C99076">333333</span><span style="color:#666666">;</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#BD976A">        --shiki-token-constant</span><span style="color:#666666">:</span><span style="color:#666666"> #</span><span style="color:#C99076">660000</span><span style="color:#666666">;</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#BD976A">        --shiki-token-string</span><span style="color:#666666">:</span><span style="color:#666666"> #</span><span style="color:#C99076">770000</span><span style="color:#666666">;</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#BD976A">        --shiki-token-comment</span><span style="color:#666666">:</span><span style="color:#666666"> #</span><span style="color:#C99076">880000</span><span style="color:#666666">;</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#BD976A">        --shiki-token-keyword</span><span style="color:#666666">:</span><span style="color:#666666"> #</span><span style="color:#C99076">990000</span><span style="color:#666666">;</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#BD976A">        --shiki-token-parameter</span><span style="color:#666666">:</span><span style="color:#666666"> #</span><span style="color:#C99076">aa0000</span><span style="color:#666666">;</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#BD976A">        --shiki-token-function</span><span style="color:#666666">:</span><span style="color:#666666"> #</span><span style="color:#C99076">bb0000</span><span style="color:#666666">;</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#BD976A">        --shiki-token-string-expression</span><span style="color:#666666">:</span><span style="color:#666666"> #</span><span style="color:#C99076">cc0000</span><span style="color:#666666">;</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#BD976A">        --shiki-token-punctuation</span><span style="color:#666666">:</span><span style="color:#666666"> #</span><span style="color:#C99076">dd0000</span><span style="color:#666666">;</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#BD976A">        --shiki-token-link</span><span style="color:#666666">:</span><span style="color:#666666"> #</span><span style="color:#C99076">ee0000</span><span style="color:#666666">;</span></span>
<span class="line" style="display: table-row; line-height: 1.5; height: 1.5em;"><span style="color:#666666">      }</span></span></code></pre></span></pre>`,
    )
  })
})
