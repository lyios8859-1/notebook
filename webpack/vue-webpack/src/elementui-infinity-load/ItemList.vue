<template>
   <div class="infinite-list-wrapper" style="overflow:auto">
    <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
      <li v-for="(news, index) in newsList" class="list-item" :key="index">{{ news.newsTitle }}</li>
    </ul>
    <el-row style="height: 50px" v-if="loading"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.3)"></el-row>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import axios from 'axios';
import Vue from 'vue';
Vue.use(ElementUI, { locale });
export default Vue.extend({
  name: 'ItemList',
  data () {
    return {
      loading: false,
      newsList: [],
      pages: 1,
      currentPage: 1
    }
  },
  computed: {
    noMore () {
      return this.currentPage >= this.pages;
    },
    disabled () {
      return this.loading || this.noMore;
    }
  },
  created () {
    console.log('>>>>.....')
    axios.get("/api", {
      params: {
        type: 1,
        page: 2
      }
    }).then((response) => {
      let pageInfo = response.data;
      console.log(pageInfo);
      pageInfo.forEach((item) => {
        console.log(item)
        this.newsList.push(item.title);
      });
      this.pages = pageInfo.pages;
    }).catch((error) => {
      console.log(error);
    });
  },
  methods: {
    load () {
      this.loading = true;
      axios.get("/api", {
        params: {
          type: this.currentPage + 1,
          page: 1
        }
      }).then(function (response) {
        let pageInfo = response.data;
        console.log(pageInfo);
        pageInfo.forEach(function (item) {
          this.newsList.push(item.title);
        });
        this.currentPage = pageInfo.current;
        this.loading = false;
      }).catch(function (error) {
        console.log(error);
      })
    }
  }
})
</script>

<style scoped>
.infinite-list-wrapper {
  width: 100%;
  height: 300px;
  border: 1px solid rgba(111, 190, 19, 0.973);
}
.list {
  width: 100%;
}
.list li {
  height: 30px;
  margin: 5px 0;
  background: #8c939d;
  list-style: decimal;
}
.infinite-list-wrapper p {
  text-align: center;
}
</style>