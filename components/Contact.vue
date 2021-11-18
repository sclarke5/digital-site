<template>
  <!-- <div class="contactContainer"> -->
    <!-- <div id="response">Hello world</div> -->
    <div class="container mt-40" >
        <div class="two-column-container flex flex-col gap-4 text-white">
            <div class="col-span-1 px-6">
              <h1 class="text-5xl">GET IN TOUCH</h1>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus blandit in eget ipsum sodales.
              </p>
              <br>
              <p>support@example.com</p>
            </div>
            <div id="contactContainer" class="col-span-1 max-w-screen-sm p-8 w-full">
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
                <div id="fullName" class="mb-4 block">
                  <label class="block text-sm mb-2" :class="{'text-red-500': fNameError}" for="contactFullName"
                    >Name *</label
                  >
                  <input
                    id="contactFullName"
                    v-model="contactFullName"
                    :class="{'border-red-500': fNameError}"
                    type="text"
                    class="text-white block w-full appearance-none border border-white bg-black py-2 px-3"
                    name="contactFullName"
                    placeholder="Name"
                    aria-describedby="fnameHelp"
                  />
                </div>
                <div class="mb-4 block" :class="{'text-red-500': emailError}">
                  <label class="block text-sm mb-2" for="contactEmail"
                    >Email *</label>
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
                <div id="services" class="text-white mb-4 block">
                  <label class="block text-sm mb-2" for="contactSubservices"
                    >Services</label
                  >
                  <!-- removed multiple=true from select. change to checkboxes? -->
                  <select
                    v-model="contactSubservices"
                    class="block w-full border border-white bg-black pr-24 py-2 px-3 "
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
  <!-- </div> -->
</template>

<script>

const hubspotURL = 'https://api.hsforms.com/submissions/v3/integration/submit/485178/62db6a4e-9f21-4410-bde4-4e0d8c1952f1';

export default {
  data() {
    return {
      errors: [],
      contactEmail: null,
      contactFullName: null,
      contactPhone: null,
      contactSubservices: [],
      contactMessage: null,
      emailError: false,
      fNameError: false,
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
     .then(data => console.log('submitted: ' + data) )
     .catch(error => {
       return console.log('error: ' + error);
     } )

    },
    checkForm(e) {

      e.preventDefault()

      if (
        this.contactEmail &&
        this.contactFullName &&
        this.contactPhone &&
        this.contactSubservices &&
        this.contactMessage
      ) {

        this.data = [
          {
            name: 'email', value: this.contactEmail,
          },
          {
            name: 'full_name', value: this.contactFullName,
          },
          {
            name: 'phone', value: this.contactPhone,
          },
          {
            name: 'subservices', value: this.contactSubservices,
          },
          {
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
      if (!this.contactFullName) {
        this.errors.push('Name required.')
        this.fNameError = true;
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

.container {
  font-family: 'Gotham', sans-serif;
}

button {
    border: 2px solid white;
}

h1 {
    font-family: 'Gotham', sans-serif !important;
    line-height: 1.1;
    font-weight: 800;
}

select {
  -webkit-appearance: none;
  appearance: none;
  box-sizing: border-box;
 background-image:
    linear-gradient(45deg, transparent 50%, white 50%),
    linear-gradient(135deg, white 50%, transparent 50%);
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    calc(100% - 2.5em) 0.5em;
  background-size:
    5px 5px,
    5px 5px,
    1px 1.5em;
  background-repeat: no-repeat;

}

@media screen and (min-width: 800px) {
  .container {
    transform: rotate(90deg);
    margin-bottom: 40rem;
  }
  .two-column-container {
    flex-direction: row;
  }
}

#errorContainer {
  padding: 2rem;
  border: 1px red solid
}
</style>
