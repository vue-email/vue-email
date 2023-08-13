<script setup lang="ts">
import { ref } from 'vue'

const md = ref(`Hi [Recipient's Name],

I hope this email finds you **well**. I wanted to reach out and share some exciting news with you!

## Heading 2
First, let me introduce myself. My name is *John Doe*, and I'm a representative from **Awesome Company**. We specialize in creating innovative solutions for businesses across industries.

### Heading 3
I wanted to personally invite you to our upcoming event, which will be held at the *Grand Convention Center* on *August 10th, 2023*. It will be an amazing opportunity to network with industry professionals and learn about the latest trends in the market.

Here are some of the key highlights of the event:

- **Keynote speakers**: Renowned experts sharing their insights.
- **Panel discussions**: Engage in thought-provoking conversations.
- **Product demonstrations**: Get a hands-on experience with our latest offerings.

> Don't miss out on this fantastic event!

#### Heading 4
Please find attached the event schedule for your reference:

1. Registration: 9:00 AM - 9:30 AM
2. Opening keynote: 10:00 AM - 11:00 AM
3. Networking lunch: 12:30 PM - 1:30 PM
4. Panel discussion: 2:00 PM - 3:30 PM
5. Product demonstrations: 4:00 PM - 5:30 PM

##### Heading 5
To secure your spot, [**RSVP**](https://example.com/rsvp) at your earliest convenience. We have limited seats available, so make sure to reserve yours soon!

###### Heading 6
If you have any questions or need further information, please don't hesitate to reach out to our team at [info@awesomecompany.com](mailto:info@awesomecompany.com).

Thank you for your time, and we look forward to seeing you at the event!

Best regards,

*John Doe*
Representative, Awesome Company

![Event Image](https://picsum.photos/seed/picsum/200/300)

*Caption: Join us for an exciting event!*

------

\`\`\`python
def hello_world():
    print("Hello, World!")

hello_world()
\`\`\`\
`)
</script>

<template>
  <EHtml>
    <EHead />
    <EPreview> Markdown email preview </EPreview>
    <EBody>
      <EContainer>
        <ESection>
          <EMarkdown
            :custom-styles="{
              h1: { color: 'red' },
              h2: {
                color: 'blue',
              },
              codeInline: {
                background: 'grey',
              },
            }"
            :container-styles="{
              padding: '12px',
              border: 'solid 1px black',
            }"
            :source="md"
          />
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
