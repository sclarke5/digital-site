<template>
  <div class="top-container">
    <div class="sticky-nav">
      <div class="font-dinProBlack">Contact</div>
    </div>
    <div class="two-column-container flex flex-col gap-4 text-white">
      <div class="col-span-1 px-6">
        <div id="contact-label">
          <h2 id="contact-title" class="mt-4">GET IN <br />TOUCH</h2>
          <p id="contact-body" class="py-6">
            All fields marked with * are required.
          </p>
        </div>
        <contact-three-scene></contact-three-scene>
      </div>
      <div id="contactContainer" class="col-span-1 p-8 w-full">
        <div class="errorToast">
          <ul v-if="errors.length" id="errorContainer" class="text-red-500">
            <p>
              <b>There were {{ errors.length }} errors with your submission.</b>
            </p>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </div>
        <div class="form-success h-full flex-col justify-center">
          <h2 id="success-title">THANK YOU!</h2>
          <p id="success-body" class="py-6">
            Our team will be in touch with you shortly.
          </p>
          <div>
            <button
              class="p-2 btn btn-dark btn-lg block uppercase submit-button"
              @click="submitAnotherForm"
            >
              Submit Another Form
            </button>
          </div>
        </div>
        <form id="astoundContactForm" method="post" @submit="checkForm">
          <div id="fullName" class="mb-4 block">
            <label
              class="block text-md mb-2"
              :class="{ 'text-red-500': fNameError }"
              for="contactFullName"
              >Name *</label
            >
            <input
              id="contactFullName"
              v-model="contactFullName"
              :class="{ 'border-red-500': fNameError }"
              type="text"
              class="
                text-white
                block
                w-full
                appearance-none
                border border-white
                bg-black
                py-2
                px-3
              "
              name="contactFullName"
              placeholder="Name"
              aria-describedby="fnameHelp"
            />
          </div>
          <div class="mb-4 block" :class="{ 'text-red-500': emailError }">
            <label class="block text-md mb-2" for="contactEmail">Email *</label>
            <input
              id="contactEmail"
              v-model="contactEmail"
              :class="{ 'border-red-500': emailError }"
              type="email"
              class="
                text-white
                block
                w-full
                appearance-none
                border border-white
                bg-black
                py-2
                px-3
              "
              name="contactEmail"
              placeholder="Email Address"
              aria-describedby="emailHelp"
            />
          </div>
          <div id="phone" class="mb-4 block">
            <label class="block text-md mb-2" for="contactPhone">Phone</label>
            <input
              id="contactPhone"
              v-model="contactPhone"
              type="text"
              class="
                text-white
                block
                w-full
                appearance-none
                border border-white
                bg-black
                py-2
                px-3
              "
              name="contactPhone"
              placeholder="Phone"
              aria-describedby="phoneHelp"
            />
          </div>
          <div id="services" class="text-white mb-4 block">
            <label class="block text-md mb-2" for="services-dropdown"
              >What are you interested in?</label
            >
            <div
              class="service-dropdown py-2 px-3 font-gothamBook bg-black"
              id="services-dropdown"
              @mousedown.prevent.stop
              @focus="toggleDropdown"
              @click="toggleDropdown"
              tabindex="0"
            >
              Select all that apply
            </div>
            <div id="services-container">
              <div
                class="service-line w-full"
                v-for="(subservices, index) in subservices"
                :key="index"
              >
                <label
                  :for="subservices.for"
                  class="w-full"
                  :class="{
                    'service-main': subservices.type === 'main',
                    'service-sub': subservices.type === 'sub',
                  }"
                >
                  <span class="flex justify-between items-center">
                    {{ subservices.name }}
                    <input
                      tabindex="0"
                      type="checkbox"
                      :id="subservices.for"
                      :name="subservices.for"
                      :value="subservices.name" /></span
                ></label>
              </div>
            </div>
          </div>
          <div id="message" class="mb-4 block">
            <label class="block text-md mb-2" for="contactMessage"
              >Message</label
            >
            <textarea
              @focus="closeDropdown"
              id="contactMessage"
              v-model="contactMessage"
              rows="6"
              class="
                resize-none
                text-white
                block
                w-full
                appearance-none
                border border-white
                bg-black
                py-2
                px-3
              "
              name="contactMessage"
              placeholder="Please provide us with any specific questions, details, examples or other content or instructions that can help us better understand your inquiry and respond to you most effectively."
              aria-describedby="messageHelp"
            ></textarea>
          </div>
          <div id="privacy-disclaimer">
            <p class="text-xs">
              By clicking submit below, you consent to allow ASTOUND Group to
              store and process the personal information submitted above to
              provide you the content requested.
              <a
                href="https://www.astoundgroup.com/privacy-policy-astound"
                target="_blank"
              >
                Learn about our Privacy Policy.</a
              >
            </p>
          </div>
          <button
            id="astoundSubmitButton"
            type="submit"
            class="p-2 btn btn-dark btn-lg submit-button"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { scrollToSection } from '../mixins'
import ContactThreeScene from './ThreeScene/ContactThreeScene.vue'

const hubspotURL =
  'https://api.hsforms.com/submissions/v3/integration/submit/485178/62db6a4e-9f21-4410-bde4-4e0d8c1952f1'

export default {
  components: { ContactThreeScene },
  data() {
    return {
      errors: [],
      contactEmail: null,
      contactFullName: null,
      contactPhone: '',
      contactSubservices: '',
      contactMessage: '',
      emailError: false,
      fNameError: false,
      shown: false,
      subservices: [
        {
          name: 'Digital Craft',
          type: 'main',
          for: 'digitalCraft',
        },
        {
          name: 'User Experience',
          type: 'sub',
          for: 'ux',
        },
        {
          name: 'Website',
          type: 'sub',
          for: 'website',
        },
        {
          name: 'Mobile App',
          type: 'sub',
          for: 'app',
        },
        {
          name: 'Extended Reality',
          type: 'main',
          for: 'xr',
        },
        {
          name: 'Sales and Marketing Tools',
          type: 'sub',
          for: 'sales',
        },
        {
          name: 'Enhanced Objects and Outdoor Adventures',
          type: 'sub',
          for: 'outdoor',
        },
        {
          name: 'Social Media AR Experiences',
          type: 'sub',
          for: 'social',
        },
        {
          name: 'Virtual Events and Experiences',
          type: 'main',
          for: 'vux',
        },
        {
          name: 'Live & Pre-recorded Video Production',
          type: 'sub',
          for: 'live',
        },
        {
          name: '2D & 3D Graphics and Animation',
          type: 'sub',
          for: 'animation',
        },
        {
          name: 'Augmented and Simulated Environments',
          type: 'sub',
          for: 'environments',
        },
      ],
    }
  },
  mounted() {
    if(window.location.href.includes('contact')){
      scrollToSection(document.querySelector('#contact-marker'), 'auto')
    } 

    const checkbox = document.querySelectorAll('input[type=checkbox]')

    const maxCount = 15

    let word

    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].addEventListener('change', () => {
        const checked = document.querySelectorAll(
          'input[type=checkbox]:checked'
        )

        const servicesDropdown = document.getElementById('services-dropdown')

        if (checked.length > 0) {
          servicesDropdown.innerHTML = ''
          checked.forEach((item) => {
            if (item.value.length > maxCount) {
              word = item.value.substring(0, maxCount) + '...'
            } else {
              word = item.value
            }
            servicesDropdown.innerHTML += `${word}, `
          })
        } else {
          servicesDropdown.innerHTML = 'Please Select'
        }
      })
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.shown) {
        this.toggleDropdown()
      }
    })

    window.addEventListener('click', (e) => {
      const inside = document
        .getElementById('services-dropdown')
        .contains(e.target)

      const insideDropdown = document
        .getElementById('services-container')
        .contains(e.target)

      if (inside && insideDropdown) {
        e.stopPropagation()
      } else if (!inside && !insideDropdown && this.shown) {
        this.toggleDropdown()
      }
    })
  },
  methods: {
    toggleDropdown(e) {
      document.getElementById('services-container').style.display = this.shown
        ? 'none'
        : 'block'

      this.shown = !this.shown

      console.log(e)
    },
    openDropdown(e) {
      document.getElementById('services-container').style.display = 'block'

      this.shown = true
      console.log(e)
    },
    closeDropdown() {
      document.getElementById('services-container').style.display = 'none'

      this.shown = false
    },
    submitContactForm(data) {
      const submitData = JSON.stringify({
        fields: data,
        legalConsentOptions: {
          consent: {
            consentToProcess: true,
            text: 'I agree to allow ASTOUND Group to store and process my personal data.',
            communications: [
              {
                value: true,
                subscriptionTypeId: 999,
                text: 'I agree to receive marketing communications from ASTOUND Group.',
              },
            ],
          },
        },
      })

      console.log(submitData)

      fetch(hubspotURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: submitData,
      })
        .then((res) => {
          res.json()
        })
        .then((data) => {
          console.log(data)
          this.errors = []
          this.emailError = false
          this.fNameError = false
          console.log('submitted')
          // document.getElementById('contact-title').innerHTML = 'Thank You!'
          // document.getElementById('contact-body').innerHTML =
          //   'Our team will reach out to you shortly.'
          // document.getElementById('astoundContactForm').reset()

          document.querySelector('.form-success').style.display = 'flex'
          document.getElementById('astoundContactForm').style.display = 'none'
          document.getElementById('contact-label').style.visibility = 'hidden'
        })
        .catch((error) => {
          return console.log('error: ' + error)
        })
    },
    submitAnotherForm() {
      document.getElementById('services-dropdown').innerHTML =
        'Select all that apply'
      document.querySelector('.form-success').style.display = 'none'
      document.getElementById('astoundContactForm').style.display = 'block'
      document.getElementById('contact-label').style.visibility = 'visible'

      document.getElementById('astoundContactForm').reset()
    },
    checkForm(e) {
      e.preventDefault()

      const checkboxes = document.querySelectorAll(
        'input[type=checkbox]:checked'
      )
      const subservices = []

      for (let i = 0; i < checkboxes.length; i++) {
        subservices.push(checkboxes[i].value)
        this.contactSubservices = subservices.join(';')
      }

      if (this.contactEmail && this.contactFullName) {
        this.data = [
          {
            name: 'email',
            value: this.contactEmail,
          },
          {
            name: 'full_name',
            value: this.contactFullName,
          },
          {
            name: 'phone',
            value: this.contactPhone,
          },
          {
            name: 'subservices',
            value: this.contactSubservices,
          },
          {
            name: 'comments',
            value: this.contactMessage,
          },
        ]

        this.submitContactForm(this.data)

        return true
      }

      this.errors = []

      if (!this.contactEmail) {
        this.errors.push('Email required.')
        this.emailError = true
      }
      if (!this.contactFullName) {
        this.errors.push('Name required.')
        this.fNameError = true
      }

      if (this.errors.length > 0) {
        this.dismissError()
      }
    },
    dismissError() {
      document.querySelector('.errorToast').style.display = 'block'

      document.querySelector('.errorToast').classList.add('display')

      setTimeout(() => {
        document.querySelector('.errorToast').classList.remove('display')
        document.querySelector('.errorToast').style.display = 'none'
      }, 5000)
    },
  },
}
</script>

<style scoped>
.service-dropdown {
  @apply border border-solid border-white bg-no-repeat;

  background-image: linear-gradient(45deg, transparent 50%, white 50%),
    linear-gradient(135deg, white 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
}

@media screen(laptop) {
  .top-container {
    transform: rotate(90deg);
    position: absolute;
    left: -15em;
    top: -8em;
  }

  .errorToast {
    position: absolute;
    display: none;
    background-color: black;
    opacity: 0;
    transition: 1s ease;
    width: 400px;
    margin-left: 100px;
  }

  .errorToast.display {
    opacity: 1;
  }

  .two-column-container {
    flex-direction: row;
    min-width: max-content;
  }

  #services {
    position: relative;
    max-width: 500px;
  }

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 0;
    background-color: rgba(255, 255, 255, 1);

    /* box-shadow: 0 0 1px rgba(255, 255, 255, 1); */
  }

  #services-container {
    width: 100%;
    overflow-y: scroll;
    max-height: 300px;
    position: absolute;
    top: 4.7rem;
    left: 0;
  }

  input[type='text'],
  input[type='email'],
  textarea,
  #privacy-disclaimer {
    max-width: 500px;
  }

  .submit-button {
    transition: background-color 0.2s, color 0.2s;
  }

  .submit-button:hover {
    color: black;
    background-color: white;
  }
}

@media screen(laptopwh) {
  .top-container {
    top: 32em;
    left: -45em;
    width: min-content;
  }
  .two-column-container {
    margin-right: 10em;
    min-width: max-content;
    margin-bottom: 10em;
  }
  #astoundContactForm {
    display: grid;
    grid-template-columns: 32em 32em;
    grid-gap: 10px;
  }
}

@media screen(laptop2xwh) {
  .top-container {
    top: 30em;
    left: -45em;
  }
  .two-column-container {
    margin-right: 10em;
    min-width: max-content;
  }
  #astoundContactForm {
    display: grid;
    grid-template-columns: 30em 30em;
    grid-gap: 10px;
  }
}

@media screen(desktopwh) {
  #contactContainer {
    margin-right: -50em;
    width: 50vw;
  }

  .top-container {
    left: -23em;
    top: 15em;
    width: 80em;
  }
  .two-column-container {
    flex-direction: row;
    margin-right: 15em;
  }
}

#errorContainer {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px red solid;
}

#services-container {
  display: none;
  border: 1px solid white;
  background-color: black;
  overscroll-behavior: contain;
}

.service-line {
  padding: 0.5rem;
}

.service-sub {
  @apply font-body;
}

.service-main {
  @apply font-subHeadline uppercase font-black;
}

input[type='text'],
input[type='email'],
textarea {
  border-radius: 0;
}

input[type='checkbox'] {
  width: 1rem !important;
  height: 1rem !important;
  margin: 5px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  outline: 1px solid white;
  box-shadow: none;
  font-size: 2em;
  border-radius: 0;
}

input[type='checkbox']:checked {
  background-color: #1dade4;
  outline: none;
}

input[type='checkbox']:checked::after {
  content: '\2713';
  color: white;
  position: absolute;
  line-height: 1rem;
  font-size: 0.9rem;
  padding-left: 0.15rem;
}
.service-line:hover {
  color: black;
  background-color: white;
}

.service-line:hover input[type='checkbox'] {
  outline: 1px solid black;
}

.service-line:hover input[type='checkbox']:checked {
  outline: none;
}

#privacy-disclaimer {
  font-size: 0.75rem;
  margin: 1rem 0;
}

#privacy-disclaimer a {
  text-decoration: underline;
}

.form-success {
  display: none;
}

#services-dropdown {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 1.75rem;
}
</style>
