import { defineRoutes, LayoutBase } from 'cosey';

export default defineRoutes({
  path: '/blog',
  name: 'Blog',
  component: LayoutBase,
  meta: {
    title: 'post.blog',
    icon: 'carbon:blog',
    authority: (ability) =>
      ability.can('read', 'blog_type') ||
      ability.can('read', 'blog_post') ||
      ability.can('read', 'blog_comment'),
  },
  children: [
    {
      path: 'post-types',
      name: 'BlogPostTypes',
      component: () => import('@/views/blog/post-types/index.vue'),
      meta: {
        title: 'post.categories',
        icon: 'carbon:category',
        authority: (ability) => ability.can('read', 'blog_type'),
      },
    },
    {
      path: 'posts',
      name: 'BlogPosts',
      component: () => import('@/views/blog/posts/index.vue'),
      meta: {
        title: 'post.articles',
        icon: 'carbon:document',
        authority: (ability) => ability.can('read', 'blog_post'),
      },
    },
    {
      path: 'post-comments',
      name: 'BlogPostComments',
      component: () => import('@/views/blog/post-comments/index.vue'),
      meta: {
        title: 'post.comments',
        icon: 'carbon:chat',
        authority: (ability) => ability.can('read', 'blog_comment'),
      },
    },
  ],
});
