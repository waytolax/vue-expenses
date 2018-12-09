<template>
    <div class="expenses-page">

        <h1 class="expenses-page__title">Список расходов</h1>

        <div class="expenses-sort">
            <h2 class="expenses-sort__title">Сортировать расходы</h2>

            <InputComp
            v-for="(input, index) of inputs"
            :key="input.id"
            :id="input.id"
            :label="input.label"
            :type="input.type"
            v-model="input.value"
            />

            <select
            class="expenses-sort__filter"
            v-model="filter">
                <option value="date">По дате</option>
                <option value="sum">По сумме</option>
            </select>

            <router-link
            class="expenses-sort__link"
            tag="button"
            to="/add"
            >Добавить</router-link>

            <strong class="expenses-sort__total">Общие расходы: {{totalAmount}}</strong>

        </div>

        <table class="expenses-list">
            <tr>
                <th>Описание</th>
                <th>Сумма</th>
                <th>Дата</th>
            </tr>
            <tr v-for="(exp, index) of filteredExp">
                <td>{{exp.description}}</td>
                <td>{{exp.amount}}</td>
                <td>{{exp.date}}</td>
                <td>
                    <router-link
                    class="expenses-list__link"
                    :to="`/edit/${exp.id}`"
                    >Изменить</router-link>
                </td>
            </tr>
            <tr>
                <td class="expenses-list__total">Общие расходы</td>
                <td class="expenses-list__total">{{totalAmount}}</td>
            </tr>
        </table>

    </div>
</template>

<script>
import InputComp from './UI/InputComp.vue';

export default {
    data () {
      return {
        filter: 'date',
        inputs: [
            {id: 'date-from', type: 'date', label: 'От:', value: ''},
            {id: 'date-to', type: 'date', label: 'До:', value: ''},
        ]
      }
    },
    computed: {
      allExpenses () {
        return this.$store.getters.getExpenses;
      },
      sortedExp(){
        const expenses = [...this.allExpenses];

        return expenses.sort((a, b) => {
             if (this.filter === 'sum') {
                 return parseInt(b.amount) - parseInt(a.amount);
             }
             return Date.parse(b.date) - Date.parse(a.date);
         })
      },
      filteredExp(){
          const expenses = [...this.sortedExp];
          const from = this.inputs[0].value;
          const to = this.inputs[1].value;

          return expenses.filter((item) => {
              if (from && to) {
                  return Date.parse(item.date) >= Date.parse(from)
                      && Date.parse(item.date) <= Date.parse(to);
              }
              else if (to) {
                  return Date.parse(item.date) <= Date.parse(to);
              }
              else if (from) {
                  return Date.parse(item.date) >= Date.parse(from);
              }
              return expenses;
          })
      },
      totalAmount() {
          let total = 0;
          this.filteredExp.forEach((item) => {
             total += parseFloat(item.amount);
          })
          return total + ' RUB';
      },
    },
    components: {
        InputComp,
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .expenses-page{
        width: 100%;
        min-height: 100vh;
        box-sizing: border-box;
        padding: 50px 5px;
        background: linear-gradient(90deg, #fd8355 0%, #f0576c 37%, #f79cbd 100%);

        &__title{
            text-align: center;
            color:#fff;
        }
    }

    .expenses-sort,
    .expenses-list{
        width: 100%;
        max-width: 600px;
        box-sizing: border-box;
        margin: 0 auto;
        padding: 20px;
        background: #eee;
        border-radius: 5px;
        border-collapse: collapse;
        box-shadow: 2px 2px 2px rgba(0,0,0,.5);
    }

    .expenses-sort{
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;

        &__title{
            color: #222;
            text-align: center;
        }

        &__link,
        &__filter{
            width: 95%;
            box-sizing: border-box;
            margin: 10px auto 10px;
            padding: 10px 10px;
            cursor: pointer;
        }

        &__total{
            text-align: center;
            margin: 10px 0 0;
        }
    }

    .expenses-list{

        & th, td{ //exception
            text-align: center;
            padding: 3px 0px;
            border: 1px solid black;
        }

        &__total{
            font-weight: bold;
        }

        &__link{
            color: #333;
        }
    }

</style>
