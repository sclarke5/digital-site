<template>
  <div class="contactContainer">
    <div id="response">Hello world</div>
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
                <p v-if="errors.length" class="text-red-500">
                    <b>Please correct the following error(s):</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </p>
                <div class="mb-4 block">
                  <label class="block text-sm mb-2" for="contactFirstName"
                    >First name</label
                  >
                  <input
                    id="contactFirstName"
                    v-model="contactFirstName"
                    type="text"
                    class="p-2 text-black block w-full"
                    name="contactFirstName"
                    placeholder="First Name"
                    aria-describedby="fnameHelp"
                  />
                </div>
                <div class="mb-4 block">
                  <label class="block text-sm mb-2" for="contactLastName"
                    >Last name</label
                  >
                  <input
                    id="contactLastName"
                    v-model="contactLastName"
                    type="text"
                    class="p-2 text-black block w-full"
                    name="contactLastName"
                    placeholder="Last Name"
                    aria-describedby="lnameHelp"
                  />
                </div>
                     <div class="mb-4 block">
                  <label class="block text-sm mb-2" for="contactEmail"
                    >E-Mail</label
                  >
                  <input
                    id="contactEmail"
                    v-model="contactEmail"
                    type="email"
                    required
                    class="p-2 text-black block w-full"
                    name="contactEmail"
                    placeholder="Email Address"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="mb-4 block">
                  <label class="block text-sm mb-2" for="contactPhone"
                    >Phone</label
                  >
                  <input
                    id="contactPhone"
                    v-model="contactPhone"
                    type="text"
                    class="p-2 text-black block w-full"
                    name="contactPhone"
                    placeholder="Last Name"
                    aria-describedby="phoneHelp"
                  />
                </div>

                <div class="mb-4 block">
                  <label class="block text-sm" for="contactSubservices"
                    >Services</label
                  >
                  <!-- removed multiple=true from select. change to checkboxes? -->
                  <select
                    v-model="contactSubservices"
                    class="p-2 mb-2 block text-black w-full"
                    name="contactSubservices"
                  >
                    <option value="Digital Craft">Digital Craft</option>
                    <option value="Extended Reality">Extended Reality</option>
                    <option value="Virtual Events">Virtual Events</option>
                  </select>
                </div>
                <div class="mb-4 block">
                  <label class="block text-sm mb-2" for="contactMessage"
                    >Message</label
                  >
                  <textarea
                    id="contactMessage"
                    v-model="contactMessage"
                    rows="5"
                    class="p-2 text-black block w-full"
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
        },{
          name: 'phone', value: this.contactPhone,
        },{
          name: 'subservices', value: this.contactSubservices,
        },{
          name: 'comments', value: this.contactMessage,
        }]

       this.submitContactForm(this.data)

        return true
      }

    this.errors = []

      if (!this.contactEmail) {
        this.errors.push('Email required.')
      }
      if (!this.contactFirstName) {
        this.errors.push('First name required.')
      }
      if (!this.contactLastName) {
        this.errors.push('Last name required.')
      }
      if (!this.contactPhone) {
        this.errors.push('Phone required.')
      }
      if (!this.contactSubservices) {
        this.errors.push('Subservices required.')
      }
      if (!this.contactMessage) {
        this.errors.push('Message required.')
      }


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
    font-family: 'Gotham', sans-serif;
    font-weight: 800;
    font-size: 5rem;
}
</style>
