<script setup>
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const box = {
  padding: '0 48px',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const paragraph = {
  color: '#525f7f',

  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left',
}

const anchor = {
  color: '#556cd6',
}

const button = {
  backgroundColor: '#656ee8',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  width: '100%',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
}
</script>

<template>
  <EHtml>
    <EHead />
    <EPreview>You're now ready to make live transactions with Stripe!</EPreview>
    <EBody :style="main">
      <EContainer :style="container">
        <ESection :style="box">
          <EImg src="/static/stripe-logo.png" width="49" height="21" alt="Stripe" />
          <EHr :style="hr" />
          <EText :style="paragraph"> Thanks for submitting your account information. You're now ready to make live transactions with Stripe! </EText>
          <EText :style="paragraph"> You can view your payments and a variety of other information about your account right from your dashboard. </EText>
          <EButton px="10" py="10" :style="button" href="https://dashboard.stripe.com/login"> View your Stripe Dashboard </EButton>
          <EHr :style="hr" />
          <EText :style="paragraph">
            If you haven't finished your integration, you might find our
            <ELink :style="anchor" href="https://stripe.com/docs"> docs </ELink>
            handy.
          </EText>
          <EText :style="paragraph">
            Once you're ready to start accepting payments, you'll just need to use your live
            <ELink :style="anchor" href="https://dashboard.stripe.com/login?redirect=%2Fapikeys"> API keys </ELink>
            instead of your test API keys. Your account can simultaneously be used for both test and live requests, so you can continue testing while accepting live payments. Check
            out our
            <ELink :style="anchor" href="https://stripe.com/docs/dashboard"> tutorial about account basics </ELink>
            .
          </EText>
          <EText :style="paragraph">
            Finally, we've put together a
            <ELink :style="anchor" href="https://stripe.com/docs/checklist/website"> quick checklist </ELink>
            to ensure your website conforms to card network standards.
          </EText>
          <EText :style="paragraph">
            We'll be here to help you with any step along the way. You can find answers to most questions and get in touch with us on our
            <ELink :style="anchor" href="https://support.stripe.com/"> support site </ELink>
            .
          </EText>
          <EText :style="paragraph"> — The Stripe team </EText>
          <EHr :style="hr" />
          <EText :style="footer"> Stripe, 354 Oyster Point Blvd, South San Francisco, CA 94080 </EText>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
