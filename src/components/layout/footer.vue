<template>
  <div class="footer_container">
    <div class="inner_footer">
      <ul>
        <li v-for="(item, index) in footerMenus" :key="index">
          <h4>{{t(`footer['${item.title}']`)}}</h4>
          <a
            v-for="(item$2, index$2) in item.menus" :key="index$2"
            target="_blank"
            :href="item$2.link"
          >
            {{t(`footer['${item$2.name}']`)}}
          </a>
        </li>
      </ul>

      <div class="copy_right">
        © 2022 MiracleYCR . All rights reserved.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" >
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const footerMenus = reactive([
  {
    title: 'airbnb',
    menus: [
      {
        name: 'careers',
        link: 'https://www.airbnb.cn/careers'
      },
      {
        name: 'news',
        link: 'https://www.airbnb.cn/press/news'
      },
      {
        name: 'topic',
        link: 'https://www.airbnb.cn/help/topic/1578/法律条款'
      },
      {
        name: 'diversity',
        link: 'https://www.airbnb.cn/diversity'
      },
      {
        name: 'accessibility',
        link: 'https://www.airbnb.cn/accessibility'
      }
    ]
  },
  {
    title: 'discovery',
    menus: [
      {
        name: 'trustAndSafe',
        link: 'https://www.airbnb.cn/trust'
      },
      {
        name: 'invite',
        link: 'https://www.airbnb.cn/invite?r=6'
      },
      {
        name: 'evection',
        link: 'https://www.airbnb.cn/work?s=footer'
      },
      {
        name: 'magzine',
        link: 'https://airbnbmag.com'
      },
      {
        name: 'airbnborg',
        link: 'https://www.airbnb.org/?locale=zh'
      }
    ]
  },
  {
    title: 'rent',
    menus: [
      {
        name: 'whyRent',
        link: 'https://www.airbnb.cn/host/homes?from_footer=1'
      },
      {
        name: 'hospitality',
        link: 'https://www.airbnb.cn/hospitality'
      },
      {
        name: 'responsibleHosting',
        link: 'https://www.airbnb.cn/help/responsible-hosting'
      },
      {
        name: 'experiences',
        link: 'https://www.airbnb.cn/host/experiences?from_footer=1'
      },
      {
        name: 'resources',
        link: 'https://www.airbnb.cn/resources?traffic_source=footer'
      }
    ]
  },
  {
    title: 'service',
    menus: [
      {
        name: 'help',
        link: 'https://www.airbnb.cn/help?from=footer'
      },
      {
        name: 'neighbors',
        link: 'https://www.airbnb.cn/neighbors'
      }
    ]
  }
])
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variable.scss';
.footer_container {
  height: 337px;
  border-top: 1px solid #ccc;
  .inner_footer {
    @include main-wrapper;
    ul {
      @include flex-layout(row, space-between, flex-start);
      li {
        @include flex-layout(column, space-between, flex-start);
        a {
          color: #999;
          font-size: 14px;
          margin-bottom: 10px;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .copy_right {
      @include main-wrapper;
      color: #666;
      padding: 30px 0;
      text-align: center;
      border-top: 1px solid #ccc;
    }
  }
}
</style>
