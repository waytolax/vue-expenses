<template>
    <div class="add-edit-page">

        <h1 class="add-edit-page__title">
            {{page === 'add' ? settings[0].title : settings[1].title}}
        </h1>

        <form class="add-edit-page__form">

            <InputComp
            v-for="(input, index) of inputs"
            :key="input.id"
            :id="input.id"
            :label="input.label"
            :type="input.type"
            v-model="input.value"
            />

            <ButtonComp
            v-on="{click: page === 'add' ? onAdd : onSave}"
            :disabled="!isValid"
            >{{page === 'add' ? settings[0].mainBtn : settings[1].mainBtn}}
            </ButtonComp>

            <ButtonComp
            v-if="page === 'edit'"
            @click="onDelete"
            :disabled="!isValid"
            >{{settings[1].secBtn}}
            </ButtonComp>

        </form>

    </div>
</template>

<script>
import InputComp from './UI/InputComp.vue';
import ButtonComp from './UI/ButtonComp.vue';

export default {
  data () {
    return {
      page: 'add',
      settings: [
          {title: 'Добавить расходы', mainBtn: 'Добавить'},
          {title: 'Редактировать расходы', mainBtn: 'Сохранить', secBtn: 'Удалить'}
      ],
      inputs: [
          {id: 'description', type: 'text', label: 'Описание:', value: '' },
          {id: 'amount', type: 'number', label: 'Сумма:', value: null},
          {id: 'date', type: 'date', label: 'Дата:', value: ''},
      ]
    }
  },
  components: {
      InputComp,
      ButtonComp,
  },
  computed:{
      isValid(){
          if (this.inputs[0].value && this.inputs[1].value) {
              return true;
          }
      },
      currentItem() {
        const id = this.$route.params['id'];
        return this.$store.getters.getExpenses.find(item => item.id === id);
      },
  },
  methods:{
      onSave(){
          const expenses = {
              id: this.currentItem.id,
              description: this.inputs[0].value,
              amount: `${parseFloat(this.inputs[1].value).toFixed(2)} RUB`,
              date: this.inputs[2].value,
          }
          this.$store.dispatch('editExpenses', expenses);
          this.$router.push('/');
      },
      onDelete(){
          this.$store.dispatch('delete', this.currentItem);
          this.$router.push('/');
      },
      onAdd(){
          const expenses = {
              id: Math.random().toString(36).substr(2, 6),
              description: this.inputs[0].value,
              amount: `${parseFloat(this.inputs[1].value).toFixed(2)} RUB`,
              date: this.inputs[2].value,
          }
          this.$store.dispatch('addExpenses', expenses);
          this.inputs[0].value = '';
          this.inputs[1].value = null;
          this.$router.push('/');
      }
  },
  mounted: function () {
    if (this.$route.params['id']) {
        this.page = 'edit';
        this.inputs[0].value = this.currentItem.description;
        this.inputs[1].value = parseInt(this.currentItem.amount);
        this.inputs[2].value = this.currentItem.date;
    } else {
        const tzoffset = (new Date()).getTimezoneOffset() * 60000;
        const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 10);
        this.inputs[2].value = localISOTime;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .add-edit-page{
        width: 100%;
        height: 100vh;
        box-sizing: border-box;
        padding: 50px 20px;
        background: linear-gradient(270deg, #cef2fa 0%, #59bfef 100%);

        &__title{
            text-align: center;
            color:#fff;
        }

        &__form{
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 600px;
            box-sizing: border-box;
            margin: 0 auto;
            padding: 20px;
            background: #eee;
            border-radius: 5px;
            box-shadow: 2px 2px 2px rgba(0,0,0,.5);
        }
    }

</style>
