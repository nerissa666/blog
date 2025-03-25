<template>
  <div class="about">
    <div>
      <h2>ABOUT ME</h2>
      <article>
        Beauty这个形容词，大概就是为我而创造的吧😏<br />

        谢谢你这么好看还这么关注我鸭！我叫小红帽，你可以亲切的叫我小红帽！或者…<br />

        有必要强调一下！我还没有秃头！大概是写的代码还不够多...
      </article>
    </div>
    <div>
      <h2>ABOUT SITE</h2>
      <article>
        <p>
          前 端：<span>Vue + Element</span><br />

          后 端：<span>Node + Nuxt + Express + Mongodb</span><br />

          服务器：<a href="https://www.aliyun.com/benefit" target="_blank">阿里云ECS</a><br />
        </p>
        这个博客我在2021年就开始构思了，终于要在2025年上线了！我真棒！😂
        这不能怪我...真的...每当我好不容易挤点时间写好代码准备上线时，总有前端技术在这个时间点做大的更新...React、Node、Vue、Nuxt...我也很绝望啊，每次都是推翻重写，裂开...
      </article>
    </div>
    <div>
      <h2>ABOUT COPYRIGHT</h2>
      <article>
        源码开源：<a href="https://github.com/nerissa666" target="_blank">小红帽的github</a
        ><br />

        在注明出处的前提下，本站文章允许非商业用途的转载。
      </article>
    </div>
    <div>
      <h2>OTHER</h2>
      <article>
        我是一名前端开发者，也是一名前端技术探索者（一直关注行业趋势，鸿蒙...），如果有合作相关事宜的话，可以通过
        <a href="/#contact">contact me</a>
        联系我。或者可以在👈左侧边栏找到我的联系方式哦。
      </article>
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.about {
  > div {
    box-shadow: 0 0 4px #ddd;
    margin-bottom: 2%;
    background-color: #fff;
    padding: 2%;
    font-family: Quicksand;
  }
  h2 {
    margin-bottom: 15px;
    font-size: 20px;
    letter-spacing: 3px;
    line-height: 24px;
    border-left: 5px solid #73b899;
    text-indent: 10px;
    text-align: left;
    font-weight: bold;
    color: #000;
  }
  article {
    color: #444;
    font-size: 1rem;
    letter-spacing: 0.2rem;
    line-height: 30px;
    text-align: left;
    margin-bottom: 1%;
    padding-left: 2rem;
    font-size: 14px;
    letter-spacing: 4px;
    line-height: 30px;
    span {
      color: #bd4147;
      background-color: rgba(27, 31, 35, 0.05);
      font-weight: 700;
    }
    a {
      color: #409eff;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
