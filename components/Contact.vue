<template>
  <div class="top-container mt-40">
    <div class="sticky-nav">
      <div class="font-dinProBlack">Contact</div>
    </div>
    <div class="two-column-container flex flex-col gap-4 text-white">
      <div class="col-span-1 px-6">
        <h2 id="contact-title">GET IN <br />TOUCH</h2>
        <p id="contact-body" class="py-6">
          All fields marked with * are required.
        </p>
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
            >
              Please Select
            </div>
            <div id="services-container">
              <div class="service-line">
                <label for="service-digitalCraft" class="service-main"
                  >Digital Craft</label
                >
                <input
                  type="checkbox"
                  id="service-digitalCraft"
                  name="Digital Craft"
                  value="Digital Craft"
                />
              </div>
              <div class="service-line">
                <label for="service-ux" class="service-sub"
                  >User Experience</label
                >
                <input
                  type="checkbox"
                  id="service-ux"
                  name="User Experience"
                  value="User Experience"
                />
              </div>
              <div class="service-line">
                <label for="service-website" class="service-sub">Website</label>
                <input
                  type="checkbox"
                  id="service-website"
                  name="Website"
                  value="Website"
                />
              </div>
              <div class="service-line">
                <label for="service-app" class="service-sub">Mobile App</label>
                <input
                  type="checkbox"
                  id="service-app"
                  name="Mobile App"
                  value="Mobile App"
                />
              </div>
              <div class="service-line">
                <label for="service-xr" class="service-main"
                  >Extended Reality</label
                >
                <input
                  type="checkbox"
                  id="service-xr"
                  name="Extended Reality"
                  value="Extended Reality"
                />
              </div>
              <div class="service-line">
                <label for="service-sales" class="service-sub"
                  >Sales and Marketing Tools</label
                >
                <input
                  type="checkbox"
                  id="service-sales"
                  name="Sales and Marketing Tools"
                  value="Sales and Marketing Tools"
                />
              </div>
              <div class="service-line">
                <label for="service-adventures" class="service-sub"
                  >Enhanced Objects and Outdoor Adventures</label
                >
                <input
                  type="checkbox"
                  id="service-adventures"
                  name="Enhanced Objects and Outdoor Adventures"
                  value="Enhanced Objects and Outdoor Adventures"
                />
              </div>
              <div class="service-line">
                <label for="service-social" class="service-sub"
                  >Social Media AR Experiences</label
                >
                <input
                  type="checkbox"
                  id="service-social"
                  name="Social Media AR Experiences"
                  value="Social Media AR Experiences"
                />
              </div>
              <div class="service-line">
                <label for="service-virtual" class="service-main"
                  >Virtual Events and Experiences</label
                >
                <input
                  type="checkbox"
                  id="service-virtual"
                  name="Virtual Events and Experiences"
                  value="Virtual Events and Experiences"
                />
              </div>
              <div class="service-line">
                <label for="service-live" class="service-sub"
                  >Live & Pre-recorded Video Production</label
                >
                <input
                  type="checkbox"
                  id="service-live"
                  name="Live & Pre-recorded Video Production"
                  value="Live & Pre-recorded Video Production"
                />
              </div>
              <div class="service-line">
                <label for="service-2d3d" class="service-sub"
                  >2D & 3D Graphics and Animation</label
                >
                <input
                  type="checkbox"
                  id="service-2d3d"
                  name="2D & 3D Graphics and Animation"
                  value="2D & 3D Graphics and Animation"
                />
              </div>
              <div class="service-line">
                <label for="service-environments" class="service-sub"
                  >Augmented and Simulated Environments</label
                >
                <input
                  type="checkbox"
                  id="service-environments"
                  name="Augmented and Simulated Environments"
                  value="Augmented and Simulated Environments"
                />
              </div>
            </div>
          </div>
          <div id="message" class="mb-4 block">
            <label class="block text-md mb-2" for="contactMessage"
              >Message</label
            >
            <textarea
              id="contactMessage"
              v-model="contactMessage"
              rows="5"
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
            class="p-2 btn btn-dark btn-lg"
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
const hubspotURL =
  'https://api.hsforms.com/submissions/v3/integration/submit/485178/62db6a4e-9f21-4410-bde4-4e0d8c1952f1'

export default {
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
    }
  },
  mounted() {
    const checkbox = document.querySelectorAll('input[type=checkbox]')

    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].addEventListener('change', () => {
        const checked = document.querySelectorAll(
          'input[type=checkbox]:checked'
        )

        document.getElementById('services-dropdown').innerHTML =
          checked.length > 0 ? `${checked.length} selected` : 'Please Select'
      })
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.shown) {
        this.toggleDropdown()
      }
    })

    document.getElementById('contact-marker').addEventListener(
      'click',
      (e) => {
        const inside = document
          .getElementById('services-container')
          .contains(e.target)

        if (document.getElementById('services-dropdown').contains(e.target)) {
          this.toggleDropdown()
        } else if (!inside && this.shown) {
          this.toggleDropdown()
        }
      },
      false
    )
  },
  methods: {
    toggleDropdown() {
      document.getElementById('services-container').style.display = this.shown
        ? 'none'
        : 'block'

      this.shown = !this.shown
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
          document.getElementById('contact-title').innerHTML = 'Thank You!'
          document.getElementById('contact-body').innerHTML =
            'Our team will reach out to you shortly.'
          document.getElementById('astoundContactForm').reset()
        })
        .catch((error) => {
          return console.log('error: ' + error)
        })
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
  #contactContainer {
    max-width: 50vw;
  }

  .top-container {
    transform: rotate(90deg);
    position: absolute;
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
  }

  #services {
    position: relative;
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
}

@media screen(laptopwh) {
  .top-container {
    top: 560em;
    right: -14em;
    width: min-content;
  }
  .two-column-container {
    margin-right: 10em;
    min-width: max-content;
  }
  #astoundContactForm {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }
}

@media screen(laptop2xwh) {
  .top-container {
    top: 560em;
    right: -16em;
  }
  .two-column-container {
    margin-right: 10em;
    min-width: max-content;
  }
  #astoundContactForm {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }
}

@media screen(desktopwh) {
  .top-container {
    top: 570em;
    right: -7em;
    width: 80em;
  }
  .two-column-container {
    flex-direction: row;
    margin-right: 10em;
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
}

.service-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
</style>
