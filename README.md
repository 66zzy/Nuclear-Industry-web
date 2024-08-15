# Nuclear-Industry-web
宣怀杯数字孪生网页

**目录介绍**
src/views:各页面文件
src/router:路由配置
src/components:graph为图表组件，setParam为设定参数弹窗
  useless目录中是以前的失败案例，可以删了
  一维图:graph1.vue
  二维图:graph2_choose.vue(点击加减号选择图层的二维图)和graph2.vue(在三维图上直接点击选择图层的二维图)
  三维图:graph3_bar.vue(其实可以把_bar去掉，之前这么写是因为这个三维图其实是用一个个三维柱状图搭起来的；为了实现z轴缩放还加入了透明柱，这方面记不太清了)
  没在网页中使用的两个图表:
    graph1_1.vue:貌似没用了
    graph3_detect.vue:之前用于绘制监测点位置的示意图
src/assets:各种图片、视频

**使用的部分组件**
gridstack:用于可视化组件缩放和移动(详见https://www.npmjs.com/package/gridstack)
echarts:用于绘制图表