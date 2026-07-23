<template>
  <div :class="bem.b()">
    <MergedLayoutSidebar v-if="layoutStore.isMobile || !layoutStore.isHorizontal">
      <MergedLayoutSnugAside
        v-if="!layoutStore.isMobile && (layoutStore.isBiserial || layoutStore.isHorizontalBiserial)"
      />
      <MergedLayoutAside
        v-if="
          layoutStore.isMobile ||
          layoutStore.isVertical ||
          layoutStore.isBiserial ||
          layoutStore.isHorizontalVertical ||
          layoutStore.isHorizontalBiserial
        "
      />
    </MergedLayoutSidebar>

    <MergedLayoutMask v-if="layoutStore.isMobile" />

    <MergedLayoutContent>
      <MergedLayoutHeader>
        <MergedLayoutTopbar>
          <template #left>
            <MergedLayoutBrand
              v-if="
                !layoutStore.isMobile &&
                (layoutStore.isHorizontal ||
                  layoutStore.isHorizontalVertical ||
                  layoutStore.isHorizontalBiserial)
              "
              is-horizontal
            />
            <MergedLayoutToggle
              v-if="layoutStore.isMobile || layoutStore.isVertical || layoutStore.isBiserial"
            />
            <component :is="AfterToggle" />
            <MergedLayoutBreadcrumb
              v-if="!layoutStore.isMobile && (layoutStore.isVertical || layoutStore.isBiserial)"
            />
            <MergedLayoutTopSnugMenu
              v-if="
                !layoutStore.isMobile &&
                (layoutStore.isHorizontalVertical || layoutStore.isHorizontalBiserial)
              "
            />
            <MergedLayoutMenu
              v-if="!layoutStore.isMobile && layoutStore.isHorizontal"
              mode="horizontal"
              style="flex: 1"
            />
          </template>
          <template #right>
            <MergedLayoutSearch />
            <component :is="TopbarWidget" />
            <MergedLayoutLocale />
            <MergedLayoutColorScheme />
            <MergedLayoutUserMenu />
            <component :is="TopbarRight" />
          </template>
        </MergedLayoutTopbar>
        <MergedLayoutTabbar />
      </MergedLayoutHeader>
      <MergedLayoutMain />
    </MergedLayoutContent>
  </div>
</template>

<script setup lang="ts">
import MergedLayoutAside from '../merged/layout-aside';
import MergedLayoutBrand from '../merged/layout-brand';
import MergedLayoutBreadcrumb from '../merged/layout-breadcrumb';
import MergedLayoutContent from '../merged/layout-content';
import MergedLayoutHeader from '../merged/layout-header';
import MergedLayoutLocale from '../merged/layout-locale';
import MergedLayoutMain from '../merged/layout-main';
import MergedLayoutMask from '../merged/layout-mask';
import MergedLayoutMenu from '../merged/layout-menu';
import MergedLayoutSidebar from '../merged/layout-sidebar';
import MergedLayoutSnugAside from '../merged/layout-snug-aside';
import MergedLayoutTabbar from '../merged/layout-tabbar';
import MergedLayoutToggle from '../merged/layout-toggle';
import MergedLayoutTopSnugMenu from '../merged/layout-top-snug-menu';
import MergedLayoutTopbar from '../merged/layout-topbar';
import MergedLayoutColorScheme from '../merged/layout-color-scheme';
import MergedLayoutSearch from '../merged/layout-search';
import MergedLayoutUserMenu from '../merged/layout-user-menu';

import { useLayoutStore } from '../../store';
import { useGlobalConfig } from '../../config';
import { defineTemplate } from '../../utils';
import { createBem } from '../../utils';

defineOptions({
  name: 'CoLayoutBase',
});

const bem = createBem('layout-base');

const layoutStore = useLayoutStore();
const slotsConfig = useGlobalConfig().slots;

const TopbarRight = defineTemplate(() => slotsConfig.topbarRight?.());
const TopbarWidget = defineTemplate(() => slotsConfig.topbarWidget?.());
const AfterToggle = defineTemplate(() => slotsConfig.afterToggle?.());
</script>
