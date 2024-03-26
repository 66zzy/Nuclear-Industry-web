<template>
  <div class="panel">
      <h2 style="color: white;">三维数据</h2>
      <div style="display: flex;height: 10px;justify-content: space-evenly;">
        <div style="display:flex;width: 120px;padding-left: 2px;">
          <p style="color: white;font-size:25px;padding: 0;position: relative;top:-45px">x: </p>
          <el-slider v-model="boxWidth" max="200"/>
        </div>    
        <div style="display:flex;width: 120px;padding-left: 2px;">
          <p style="color: white;font-size:25px;padding: 0;position: relative;top:-45px">y:</p>
          <el-slider v-model="boxDepth" max="200"/>
        </div>    
        <div style="display:flex;width: 120px;padding-left: 2px;">
          <p style="color: white;font-size:25px;padding: 0;position: relative;top:-45px">z:</p>
          <el-slider v-model="boxHeight" max="200"/>
        </div>     
      </div>
      <div class="chart" ref="chart" style="width: 500px;height: 500px;padding-bottom: 10px;"></div>
      <div class="panel-footer"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default {
  props: {
    data: Array,
  },
  mounted() {
    this.drawPlot();
  },
  updated() {
    this.drawPlot();
  },
  methods: {
    drawPlot() {
      const data = this.data;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75,1, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(500, 500);
      this.$refs.chart.appendChild(renderer.domElement);
      // 创建一个长度为10的坐标轴助手
      const axesHelper = new THREE.AxesHelper(10);
      // 将坐标轴助手添加到场景中
      scene.add(axesHelper);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.update();

      const geometry = new THREE.BoxGeometry(1, 1, 1);

      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          for (let k = 0; k < data[i][j].length; k++) {
            if (data[i][j][k] === 0) {
              continue;
            }
            const color = new THREE.Color(`hsl(${data[i][j][k] * 360}, 100%, 50%)`);
            const material = new THREE.MeshBasicMaterial({color: color});
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(i, j, k);
            scene.add(cube);
          }
        }
      }

      camera.position.z = 5;

      const animate = function () {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };

      animate();
    }
  }
};
</script>
<style src="/Users/12031/Documents/GitHub/Nuclear-Industry-web/vue/src/components/style.css"></style>