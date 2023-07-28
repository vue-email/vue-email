<script setup>
defineProps({
  userFirstname: {
    type: String,
    default: 'John',
  },
})

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
}

const logo = {
  margin: '0 auto',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
}

const btnContainer = {
  textAlign: 'center',
}

const button = {
  backgroundColor: '#5F51E8',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
}

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
}
</script>

<template>
  <EHtml>
    <EHead />
    <EPreview> The sales intelligence platform that helps you uncover qualified leads. </EPreview>
    <EBody :style="main">
      <EContainer :style="container">
        <EImg src="/static/koala-logo.png" width="170" height="50" alt="Koala" :style="logo" />
        <EText :style="paragraph"> Hi {{ userFirstname }}, </EText>
        <EText :style="paragraph"> Welcome to Koala, the sales intelligence platform that helps you uncover qualified leads and close deals faster. </EText>
        <ESection :style="btnContainer">
          <EButton px="12" py="12" :style="button" href="https://getkoala.com"> Get started </EButton>
        </ESection>
        <EText :style="paragraph">
          Best,
          <br />
          The Koala team
        </EText>
        <EHr :style="hr" />
        <EText :style="footer"> 408 Warren Rd - San Mateo, CA 94402 </EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
