<template>
  <div class="contactContainer" id="contact">
    <div class="container">
        <div class="grid grid-cols-2 gap-4 text-white">
            <div class="col-span-1">
              <h1>GET IN TOUCH</h1>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus blandit in eget ipsum sodales.
              </p>
              <br>
              <p>support@example.com</p>
            </div>
            <div class="col-span-1 max-w-screen-sm p-8">
              <form
                id="astoundContactForm"
                method="post"
                @submit="checkForm"
              >
                <p v-if="errors.length" id="errorContainer" class="text-red-500">
                    <b>There were {{errors.length}} errors with your submission.</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
                <div id="firstName" class="mb-4 block">
                  <label class="block text-sm mb-2" :class="{'text-red-500': fNameError}" for="contactFirstName"
                    >First name *</label
                  >
                  <input
                    id="contactFirstName"
                    v-model="contactFirstName"
                    :class="{'border-red-500': fNameError}"
                    type="text"
                    class="text-white block w-full appearance-none border border-white bg-black py-2 px-3"
                    name="contactFirstName"
                    placeholder="First Name"
                    aria-describedby="fnameHelp"
                  />
                </div>
                <div id="lastName" class="mb-4 block">
                  <label class="block text-sm mb-2"  :class="{'text-red-500': lNameError}" for="contactLastName"
                    >Last name *</label
                  >
                  <input
                    id="contactLastName"
                    v-model="contactLastName"
                    :class="{'border-red-500': lNameError}"
                    type="text"
                    class="text-white block w-full appearance-none border border-white bg-black py-2 px-3"
                    name="contactLastName"
                    placeholder="Last Name"
                    aria-describedby="lnameHelp"
                  />
                </div>
                     <div class="mb-4 block" :class="{'text-red-500': emailError}">
                  <label class="block text-sm mb-2" for="contactEmail"
                    >Email *</label
                  >
                  <input
                    id="contactEmail"
                    v-model="contactEmail"
                    :class="{'border-red-500': emailError}"
                    type="email"
                    class="text-white block w-full appearance-none border border-white bg-black py-2 px-3"
                    name="contactEmail"
                    placeholder="Email Address"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div id="phone" class="mb-4 block">
                  <label class="block text-sm mb-2" for="contactPhone"
                    >Phone</label
                  >
                  <input
                    id="contactPhone"
                    v-model="contactPhone"
                    type="text"
                    class="text-white block w-full appearance-none border border-white bg-black py-2 px-3"
                    name="contactPhone"
                    placeholder="Phone"
                    aria-describedby="phoneHelp"
                  />
                </div>
                <div id="services" class="mb-4 block">
                  <label class="block text-sm mb-2" for="contactSubservices"
                    >Services</label
                  >
                  <!-- removed multiple=true from select. change to checkboxes? -->
                  <select
                    v-model="contactSubservices"
                    class="text-white block w-full border border-white bg-black pr-24 py-2 px-3 "
                    name="contactSubservices"
                  >
                    <option value="Digital Craft">Digital Craft</option>
                    <option value="Extended Reality">Extended Reality</option>
                    <option value="Virtual Events">Virtual Events</option>
                  </select>
                </div>
                <div id="message" class="mb-4 block">
                  <label class="block text-sm mb-2" for="contactMessage"
                    >Message</label
                  >
                  <textarea
                    id="contactMessage"
                    v-model="contactMessage"
                    rows="5"
                    class="text-white block w-full appearance-none border border-white bg-black py-2 px-3"
                    name="contactMessage"
                    placeholder="Message"
                    aria-describedby="messageHelp"
                  ></textarea>
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
  </div>
</template>

<script>

const hubspotURL = 'https://api.hsforms.com/submissions/v3/integration/submit/485178/62db6a4e-9f21-4410-bde4-4e0d8c1952f1';

export default {
  data() {
    return {
      errors: [],
      contactEmail: null,
      contactFirstName: null,
      contactLastName: null,
      contactPhone: null,
      contactSubservices: [],
      contactMessage: null,
      emailError: false,
      fNameError: false,
      lNameError: false,
    }
  },
  methods: {
    submitContactForm(data){
      fetch(hubspotURL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({fields:data})
     })
     .then((res)=>{res.json()})
     .then(data => console.log('submitted' + data) )
     .catch(error => {
       return console.log('error: ' + error);
     } )

    },
    checkForm(e) {

      e.preventDefault()

      if (
        this.contactEmail &&
        this.contactFirstName &&
        this.contactLastName &&
        this.contactPhone &&
        this.contactSubservices &&
        this.contactMessage
      ) {

        this.data = [{
          name: 'email', value: this.contactEmail,
        },{
          name: 'firstname', value: this.contactFirstName,
        },{
          name: 'lastname', value: this.contactLastName,
        }, {
          name: 'phone', value: this.contactPhone,
        },{
          name: 'subservices', value: this.contactSubservices,
        },{
          name: 'comments', value: this.contactMessage,
        }
        ]

       this.submitContactForm(this.data)

        return true
      }

    this.errors = []

      if (!this.contactEmail) {
        this.errors.push('Email required.')
        this.emailError = true;
      }
      if (!this.contactFirstName) {
        this.errors.push('First name required.')
        this.fNameError = true;
      }
      if (!this.contactLastName) {
        this.errors.push('Last name required.')
        this.lNameError = true;
      }
      // if (!this.contactPhone) {
      //   this.errors.push('Phone required.')
      // }
      // if (!this.contactSubservices) {
      //   this.errors.push('Subservices required.')
      // }
      // if (!this.contactMessage) {
      //   this.errors.push('Message required.')
      // }

    },
  },
}
</script>

<style scoped>
.contactContainer {
  transform: rotate(90deg);
  font-family: 'Gotham', sans-serif;
}

button {
    border: 1px solid white;
}

h1 {
    font-family: 'Gotham-Black', sans-serif;
    font-size: 5rem;
}

#errorContainer {
  padding: 2rem;
  border: 1px red solid
}
</style>
