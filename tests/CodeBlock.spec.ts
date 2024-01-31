import { describe, it } from 'vitest'

describe('render', () => {
  it('renders the <Column> component', async () => {
    // const component = h(ECodeBlock, {
    //   code: `import { codeToThemedTokens } from 'shiki'

    //   const tokens = await codeToThemedTokens('<div class="foo">bar</div>', {
    //     lang: 'html',
    //     theme: 'min-dark'
    //   })`,
    //   lang: 'typescript',
    //   theme: 'dracula',
    // })

    // const actualOutput = await useRender(component)

    //     expect(actualOutput.html).toMatchInlineSnapshot(
    //       `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><pre class="shiki dracula" style="background-color:#282A36;color:#F8F8F2" tabindex="0"><code><span class="line"><span style="color:#FF79C6">export</span><span style="color:#FF79C6"> default</span><span style="color:#FF79C6"> async</span><span style="color:#F8F8F2"> (</span><span style="color:#FFB86C;font-style:italic">req</span><span style="color:#F8F8F2">,
    // </span><span style="color:#FFB86C;font-style:italic">res</span><span style="color:#F8F8F2">) </span><span style="color:#FF79C6">=></span><span style="color:#F8F8F2"> {</span></span>
    // <span class="line"><span style="color:#FF79C6">            try</span><span style="color:#F8F8F2"> {</span></span>
    // <span class="line"><span style="color:#FF79C6">              const</span><span style="color:#F8F8F2"> html </span><span style="color:#FF79C6">=</span><span style="color:#FF79C6"> await</span><span style="color:#50FA7B"> renderAsync</span><span style="color:#F8F8F2">(</span></span><span class="line"><span style="color:#50FA7B">                EmailTemplate</span><span style="color:#F8F8F2">({ firstName</span><span style="color:#FF79C6">:</span><span style="color:#E9F284"> '</span><span style="color:#F1FA8C">John</span><span style="color:#E9F284">'</span><span style="color:#F8F8F2"> })</span></span><span class="line"><span style="color:#F8F8F2">              );</span></span><span class="line"><span style="color:#FF79C6">              return</span><span style="color:#F8F8F2"> NextResponse.</span><span style="color:#50FA7B">json</span><span style="color:#F8F8F2">({ html });</span></span><span class="line"><span style="color:#F8F8F2">            } </span><span style="color:#FF79C6">catch</span><span style="color:#F8F8F2"> (error) {</span></span><span class="line"><span style="color:#FF79C6">              return</span><span style="color:#F8F8F2"> NextResponse.</span><span style="color:#50FA7B">json</span><span style="color:#F8F8F2">({ error });</span></span><span class="line"><span style="color:#F8F8F2">            }</span></span><span class="line"><span style="color:#F8F8F2">          }</span></span></code></pre>`,
    //     )
  })
})
