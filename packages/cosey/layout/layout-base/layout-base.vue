<template>
  <div :class="bem.b()">
    <component :is="SidebarComp" v-if="layoutStore.isMobile || !layoutStore.isHorizontal">
      <component
        :is="SnugAsideComp"
        v-if="!layoutStore.isMobile && (layoutStore.isBiserial || layoutStore.isHorizontalBiserial)"
      />
      <component
        :is="AsideComp"
        v-if="
          layoutStore.isMobile ||
          layoutStore.isVertical ||
          layoutStore.isBiserial ||
          layoutStore.isHorizontalVertical ||
          layoutStore.isHorizontalBiserial
        "
      />
    </component>

    <component :is="MaskComp" v-if="layoutStore.isMobile" />

    <component :is="ContentComp">
      <component :is="HeaderComp">
        <component :is="TopbarComp">
          <template #left>
            <component
              :is="BrandComp"
              v-if="
                !layoutStore.isMobile &&
                (layoutStore.isHorizontal ||
                  layoutStore.isHorizontalVertical ||
                  layoutStore.isHorizontalBiserial)
              "
              is-horizontal
            />
            <component
              :is="ToggleComp"
              v-if="layoutStore.isMobile || layoutStore.isVertical || layoutStore.isBiserial"
            />
            <component :is="AfterToggle" />
            <component
              :is="BreadcrumbComp"
              v-if="!layoutStore.isMobile && (layoutStore.isVertical || layoutStore.isBiserial)"
            />
            <component
              :is="TopSnugMenuComp"
              v-if="
                !layoutStore.isMobile &&
                (layoutStore.isHorizontalVertical || layoutStore.isHorizontalBiserial)
              "
            />
            <component
              :is="MenuComp"
              v-if="!layoutStore.isMobile && layoutStore.isHorizontal"
              mode="horizontal"
              style="flex: 1"
            />
          </template>
          <template #right>
            <component :is="SearchComp" />
            <component :is="TopbarWidget" />
            <component :is="LocaleComp" />
            <component :is="ColorSchemeComp" />
            <component :is="UserMenuComp" />
            <component :is="TopbarRight" />
          </template>
        </component>
        <component :is="TabbarComp" />
      </component>
      <component :is="MainComp" />
    </component>
  </div>
</template>

<script setup lang="ts">
import LayoutAside from '../layout-aside/layout-aside.vue';
import LayoutBrand from '../layout-brand/layout-brand.vue';
import LayoutBreadcrumb from '../layout-breadcrumb/layout-breadcrumb.vue';
import LayoutContent from '../layout-content/layout-content.vue';
import LayoutHeader from '../layout-header/layout-header.vue';
import LayoutLocale from '../layout-locale/layout-locale.vue';
import LayoutMain from '../layout-main/layout-main.vue';
import LayoutMask from '../layout-mask/layout-mask.vue';
import LayoutMenu from '../layout-menu/layout-menu.vue';
import LayoutSidebar from '../layout-sidebar/layout-sidebar.vue';
import LayoutSnugAside from '../layout-snug-aside/layout-snug-aside.vue';
import LayoutTabbar from '../layout-tabbar/layout-tabbar.vue';
import LayoutToggle from '../layout-toggle/layout-toggle.vue';
import LayoutTopSnugMenu from '../layout-top-snug-menu/layout-top-snug-menu.vue';
import LayoutTopbar from '../layout-topbar/layout-topbar.vue';
import LayoutColorScheme from '../layout-color-scheme/layout-color-scheme.vue';
import LayoutSearch from '../layout-search/layout-search.vue';
import LayoutUserMenu from '../layout-user-menu/layout-user-menu.vue';

import { useLayoutStore } from '../../store';
import { useGlobalConfig } from '../../config';
import { useOptionalComponent } from '../../hooks';
import { defineTemplate } from '../../utils';
import { createBem } from '../../utils';

defineOptions({
  name: 'CoLayoutBase',
});

const bem = createBem('layout-base');

const layoutStore = useLayoutStore();
const { components, slots: slotsConfig } = useGlobalConfig();

const AsideComp = useOptionalComponent(() => components?.aside, LayoutAside);
const BrandComp = useOptionalComponent(() => components?.brand, LayoutBrand);
const BreadcrumbComp = useOptionalComponent(() => components?.breadcrumb, LayoutBreadcrumb);
const ContentComp = useOptionalComponent(() => components?.content, LayoutContent);
const HeaderComp = useOptionalComponent(() => components?.header, LayoutHeader);
const LocaleComp = useOptionalComponent(() => components?.locale, LayoutLocale);
const MainComp = useOptionalComponent(() => components?.main, LayoutMain);
const MaskComp = useOptionalComponent(() => components?.mask, LayoutMask);
const MenuComp = useOptionalComponent(() => components?.menu, LayoutMenu);
const SidebarComp = useOptionalComponent(() => components?.sidebar, LayoutSidebar);
const SnugAsideComp = useOptionalComponent(() => components?.snugAside, LayoutSnugAside);
const TabbarComp = useOptionalComponent(() => components?.tabbar, LayoutTabbar);
const ToggleComp = useOptionalComponent(() => components?.toggle, LayoutToggle);
const TopSnugMenuComp = useOptionalComponent(() => components?.topSnugMenu, LayoutTopSnugMenu);
const TopbarComp = useOptionalComponent(() => components?.topbar, LayoutTopbar);
const ColorSchemeComp = useOptionalComponent(() => components?.colorScheme, LayoutColorScheme);
const SearchComp = useOptionalComponent(() => components?.search, LayoutSearch);
const UserMenuComp = useOptionalComponent(() => components?.user, LayoutUserMenu);

const TopbarRight = defineTemplate(() => slotsConfig.topbarRight?.());
const TopbarWidget = defineTemplate(() => slotsConfig.topbarWidget?.());
const AfterToggle = defineTemplate(() => slotsConfig.afterToggle?.());
</script>
