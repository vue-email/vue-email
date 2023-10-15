<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  userFirstName: {
    type: String,
    default: 'John',
  },
  loginDevice: {
    type: String,
    default: 'Chrome on Mac OS X',
  },
  loginLocation: {
    type: String,
    default: 'Upland, California, United States',
  },
  loginIp: {
    type: String,
    default: '47.149.53.167',
  },
  loginDate: {
    type: Date,
    default: new Date('September 7, 2022, 10:58 am'),
  },
})

const formattedDate = new Intl.DateTimeFormat('en', {
  dateStyle: 'long',
  timeStyle: 'short',
}).format(props.loginDate)

const main = {
  backgroundColor: '#fff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const paragraph = {
  fontSize: '16px',
}

const logo = {
  padding: '30px 20px',
}

const containerButton = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
}

const button = {
  backgroundColor: '#e00707',
  padding: '12px 30px',
  borderRadius: 3,
  color: '#FFF',
  fontWeight: 'bold',
  border: '1px solid rgb(0,0,0, 0.1)',
  cursor: 'pointer',
}

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
}

const boxInfos = {
  padding: '20px 40px',
}

const containerImageFooter = {
  padding: '45px 0 0 0',
}
</script>

<template>
  <EHtml>
    <EHead />
    <EPreview>Yelp recent login</EPreview>
    <EBody :style="main">
      <EContainer>
        <ESection :style="logo">
          <EImg src="/static/yelp-logo.png" />
        </ESection>

        <ESection :style="content">
          <EImg width="620" src="/static/yelp-header.png" />

          <ERow
            :style="{
              ...boxInfos,
              paddingBottom: 0,
            }"
          >
            <EColumn>
              <EHeading style="font-size: 32; font-weight: bold; text-align: center"> Hi {{ userFirstName }}, </EHeading>
              <EHeading
                as="h2"
                :style="{
                  fontSize: '26px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }"
              >
                We noticed a recent login to your Yelp account.
              </EHeading>

              <EText :style="paragraph">
                <b>Time: </b>
                {{ formattedDate }}
              </EText>
              <EText :style="{ ...paragraph, marginTop: '-5px' }">
                <b>Device: </b>
                {{ loginDevice }}
              </EText>
              <EText :style="{ ...paragraph, marginTop: '-5px' }">
                <b>Location: </b>
                {{ loginLocation }}
              </EText>
              <EText
                :style="{
                  color: 'rgb(0,0,0, 0.5)',
                  fontSize: 14,
                  marginTop: '-5px',
                }"
              >
                *Approximate geographic location based on IP address: {loginIp}
              </EText>

              <EText :style="paragraph"> If this was you, there's nothing else you need to do. </EText>
              <EText :style="{ ...paragraph, marginTop: '-5px' }"> If this wasn't you or if you have additional questions, please see our support page. </EText>
            </EColumn>
          </ERow>
          <ERow :style="{ ...boxInfos, paddingTop: '0' }">
            <EColumn :style="containerButton" col-span="{2}">
              <EButton href="#" :style="button"> Learn More </EButton>
            </EColumn>
          </ERow>
        </ESection>

        <ESection :style="containerImageFooter">
          <EImg width="620" src="/static/yelp-footer.png" />
        </ESection>

        <EText
          :style="{
            textAlign: 'center',
            fontSize: 12,
            color: 'rgb(0,0,0, 0.7)',
          }"
        >
          © 2022 | Yelp Inc., 350 Mission Street, San Francisco, CA 94105, U.S.A. | www.yelp.com
        </EText>
      </EContainer>
    </EBody>
  </EHtml>
</template>
