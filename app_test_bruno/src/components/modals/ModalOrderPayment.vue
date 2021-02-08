<template>
  <Modal>
    <template slot="header">
      <h2 class="mb-0">Payment</h2>
    </template>
    <template slot="body">
      <fieldset>
        <div
          v-for="(field, $name) in form"
          :key="$name"
          :class="`${isValid($name)} ${field.classes || ''}`"
        >
          <label for="name">{{field.label}}</label>
          <input
            :type="field.type"
            v-mask="field.mask"
            v-model="form[$name].value"
            :placeholder="field.placeholder"
            :class="!isValid($name) ? '' : 'border-color-red'"
            @blur="$v.form[$name].$touch"
            @focus="$v.form[$name].$reset"
          />
        </div>
      </fieldset>
      <ul class="summary">
        <li>
          <span>Subtotal (w/o service):</span>
          <strong>{{subtotal | TO_BRL}}</strong>
        </li>
        <li class=" text-md">
          <span>Total:</span>
          <strong>{{subtotal * 1.13 | TO_BRL}}</strong>
        </li>
      </ul>
    </template>
    <template slot="footer">
      <button @click="$emit('cancel')" class="btn text-md">
        Go back
      </button>
      <button :disabled="$v.form.$invalid" @click="$emit('confirm')" class="btn-color-1 text-md">
        Place order
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from './Modal'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  components: {
    Modal
  },
  props: {
    order: {
      type: Object,
      required: true
    },
    subtotal: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      form: {
        cardHolder: {
          label: 'Cardholder\'s name',
          value: '',
          type: 'text',
          classes: ''
        },
        cardNumber: {
          label: 'Card number',
          value: null,
          type: 'text',
          classes: '',
          mask: '#### #### #### ####'
        },
        cardExpiration: {
          label: 'Expiry date',
          value: null,
          type: 'text',
          classes: 'w-4 ml-1',
          mask: '##/##',
          placeholder: 'MM/YY'
        },
        cardCvv: {
          label: 'CVV',
          value: null,
          type: 'text',
          classes: 'w-3',
          mask: '###'
        }
      }
    }
  },
  validations: {
    form: {
      cardHolder: {
        value: {
          required
        }
      },
      cardNumber: {
        value: {
          required,
          minLength: minLength(19)
        }
      },
      cardExpiration: {
        value: {
          required,
          minLength: minLength(5),
          validDate: function (v) {
            if (v) {
              let str = v.split('/')
              if (str[0] > 12) {
                this.form.cardExpiration.value = 12
              }
              str = parseInt('20' + str[1] + str[0])
              let d = new Date()
              d = parseInt(`${d.getFullYear()}${('0' + (d.getMonth() + 1)).slice(-2)}`)
              return str >= d
            }
            return true
          }
        }
      },
      cardCvv: {
        value: {
          required,
          minLength: minLength(3)
        }
      }
    }
  },
  mounted () {
    this.form.cardHolder.value = this.order.customerName
  },
  methods: {
    isValid (field) {
      if (this.$v.form[field]) {
        return this.$v.form[field].value.$invalid && this.$v.form[field].value.$dirty ? 'invalid' : false
      }
    },
    getProduct (id) {
      return this.$store.getters.getProducts[id]
    }
  }
}
</script>

<style lang="scss" scoped>
fieldset {
  margin: 0;
  border: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px dotted #999;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  >div {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
  }
}
.summary {
  li {
    display: flex;
    justify-content: space-between;
  }
}
</style>
