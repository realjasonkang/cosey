<template>
  <div class="layout-model">
    <el-segmented
      v-model="layout"
      size="large"
      :options="blockData"
      :props="{
        value: 'block',
        label: 'block',
      }"
    />

    <div class="block-list">
      <div
        v-for="item in blocks"
        :key="item.block"
        class="block"
        :class="{ 'is-active': currBlock === item.block }"
        @mouseenter="onMouseenter(item.block)"
        @mouseleave="onMouseleave(item.block)"
      >
        {{ item.block }}
      </div>
    </div>

    <div class="model-list">
      <div v-show="layout === 'base'" data-block="base">
        <div data-block="sidebar">
          <div data-block="snugAside">
            <div data-block="snugMenu"></div>
          </div>
          <div data-block="aside">
            <div data-block="menu"></div>
          </div>
        </div>
        <div data-block="header">
          <div data-block="topbar">
            <div data-block="brand"></div>
            <div data-block="toggle"></div>
            <div data-block="breadcrumb">
              <div data-block="breadcrumb-item" class="breadcrumb-item"></div>
              <span>/</span>
              <div data-block="breadcrumb-item" class="breadcrumb-item"></div>
              <span>/</span>
              <div data-block="breadcrumb-item" class="breadcrumb-item"></div>
            </div>
            <div data-block="topSnugMenu">
              <div data-block="menu"></div>
            </div>
            <div data-block="search"></div>
            <div data-block="colorScheme"></div>
            <div data-block="user">
              <div class="dropdown linked" data-block="dropdown"></div>
            </div>
          </div>
          <div data-block="tabbar"></div>
        </div>
        <div data-block="content">
          <div data-block="main">
            <div data-block="iframe"></div>
          </div>
        </div>
      </div>
      <div v-show="layout === 'auth'" data-block="auth">
        <div v-show="currBlock === 'login'" data-block="login"></div>
        <div v-show="currBlock === 'changePassword'" data-block="changePassword"></div>
      </div>
      <div v-show="layout === 'exception'" data-block="exception">
        <div v-show="currBlock === 'forbidden'" data-block="forbidden"></div>
        <div v-show="currBlock === 'notFound'" data-block="notFound"></div>
        <div v-show="currBlock === 'internalServerError'" data-block="internalServerError"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const blockData = ref([
  {
    block: 'base',
    children: [
      { block: 'header' },
      { block: 'topbar' },
      { block: 'brand' },
      { block: 'toggle' },
      { block: 'breadcrumb' },
      { block: 'topSnugMenu' },
      { block: 'search' },
      { block: 'colorScheme' },
      { block: 'user' },
      { block: 'tabbar' },
      { block: 'sidebar' },
      { block: 'snugAside' },
      { block: 'snugMenu' },
      { block: 'aside' },
      { block: 'menu' },
      { block: 'content' },
      { block: 'main' },
      { block: 'iframe' },
    ],
  },
  {
    block: 'auth',
    children: [{ block: 'login' }, { block: 'changePassword' }],
  },
  {
    block: 'exception',
    children: [{ block: 'forbidden' }, { block: 'notFound' }, { block: 'internalServerError' }],
  },
]);

const layout = ref('base');

const blocks = computed(
  () => blockData.value.find((item) => item.block === layout.value)!.children,
);

const currBlock = ref('');

const onMouseenter = (block: string) => {
  currBlock.value = block;
  document.querySelectorAll(`[data-block="${block}"]`)!.forEach((item) => {
    item.classList.add('is-active');
  });
};
const onMouseleave = (block: string) => {
  currBlock.value = block;
  document.querySelectorAll(`[data-block="${block}"]`)!.forEach((item) => {
    item.classList.remove('is-active');
  });
};
</script>

<style scoped>
.layout-model {
  --snug-aside-width: 85px;
  --aside-width: 220px;
  --sidebar-width: calc(var(--aside-width) + var(--snug-aside-width));
  --topbar-height: 48px;
  --tabbar-height: 41px;
  --header-height: calc(var(--topbar-height) + var(--tabbar-height));
  --stacks-color: rgba(0, 0, 0, 0.05);

  .dark & {
    --stacks-color: rgba(255, 255, 255, 0.05);
  }

  .block-list {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-block-start: 12px;
  }
  .block {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    padding: 0 12px;
    border-radius: 4px;
    background-color: var(--el-fill-color-light);
    cursor: pointer;
    transition: 0.15s;

    &.is-active {
      background-color: var(--el-color-primary);
      color: white;
    }
  }

  .model-list {
    position: relative;
    width: 100%;
    height: 500px;
    margin-block-start: 16px;

    [data-block] {
      transition: 0.15s;
      background-color: var(--stacks-color);

      &.is-active {
        &,
        & .linked {
          background-color: var(--el-color-primary) !important;
        }
      }
    }

    [data-block='base'] {
      width: 100%;
      height: 100%;

      [data-block='sidebar'] {
        position: absolute;
        inset-block-start: var(--topbar-height);
        inset-inline-start: 0;
        inset-block-end: 0;
        width: var(--sidebar-width);
        border-inline-end: 1px solid var(--stacks-color);
        background-color: transparent;
      }

      [data-block='snugAside'] {
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
        width: var(--snug-aside-width);
        height: 100%;
        padding: 8px;
      }

      [data-block='snugMenu'] {
        box-sizing: content-box;
        width: 100%;
        height: 100%;
      }

      [data-block='aside'] {
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: var(--snug-aside-width);
        width: var(--aside-width);
        height: 100%;
        padding: 8px;
        border-inline-start: 1px solid var(--stacks-color);

        [data-block='menu'] {
          box-sizing: content-box;
          width: 100%;
          height: 100%;
        }
      }

      [data-block='header'] {
        position: relative;
        background-color: transparent;
      }

      [data-block='topbar'] {
        display: flex;
        height: var(--topbar-height);
        padding: 4px;
        align-items: center;
        gap: 4px;
        border-block-end: 1px solid var(--stacks-color);

        [data-block='brand'] {
          width: var(--aside-width);
          height: 40px;
          margin-inline-start: 16px;
        }

        [data-block='toggle'] {
          width: 26px;
          height: 26px;
        }

        [data-block='topSnugMenu'] {
          flex: 1;
          width: 0;
          max-width: 420px;
          height: 40px;
        }

        [data-block='menu'] {
          width: 100%;
          height: 100%;
        }

        [data-block='breadcrumb'] {
          display: flex;
          align-items: center;
          height: 26px;
          padding: 4px;
          gap: 4px;
          background-color: transparent;

          span {
            color: var(--stacks-color);
          }

          .breadcrumb-item {
            width: 60px;
            height: 16px;
          }
        }

        [data-block='search'] {
          width: 110px;
          height: 26px;
          margin-inline-start: auto;
          border-radius: 999px;
        }

        [data-block='colorScheme'] {
          width: 26px;
          height: 26px;
          border-radius: 999px;
        }

        [data-block='user'] {
          position: relative;
          width: 32px;
          height: 32px;

          .dropdown {
            position: absolute;
            inset-block-start: calc(100% + 2px);
            inset-block-end: 0;
            width: 120px;
            height: 120px;
          }
        }
      }

      [data-block='tabbar'] {
        height: var(--tabbar-height);
        margin-inline-start: var(--sidebar-width);
        border-block-end: 1px solid var(--stacks-color);
      }

      [data-block='content'] {
        position: absolute;
        inset-block-start: var(--header-height);
        inset-inline-start: var(--sidebar-width);
        inset-inline-end: 0;
        inset-block-end: 0;
        background-color: transparent;
      }

      [data-block='main'] {
        width: 100%;
        height: 100%;
        background-color: transparent;
      }

      [data-block='iframe'] {
        box-sizing: content-box;
        width: 100%;
        height: 100%;
      }
    }

    [data-block='auth'] {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;

      [data-block='login'] {
        width: 480px;
        height: 260px;
      }

      [data-block='changePassword'] {
        width: 480px;
        height: 360px;
      }
    }

    [data-block='exception'] {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;

      [data-block] {
        width: 260px;
        height: 260px;
      }
    }
  }
}
</style>
