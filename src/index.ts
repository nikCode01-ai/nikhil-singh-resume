import type { Core } from "@strapi/strapi";

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi.db
      .query("plugin::users-permissions.role")
      .findOne({
        where: { type: "public" },
      });

    if (!publicRole) return;

    const apis = [
      "api::blog.blog",
      "api::project.project",
      "api::service.service",
    ];
    const actions = ["find", "findOne"];

    for (const api of apis) {
      for (const action of actions) {
        const existing = await strapi.db
          .query("plugin::users-permissions.permission")
          .findOne({
            where: {
              action: `${api}.${action}`,
              role: publicRole.id,
            },
          });

        if (!existing) {
          await strapi.db.query("plugin::users-permissions.permission").create({
            data: {
              action: `${api}.${action}`,
              role: publicRole.id,
            },
          });
        }
      }
    }
  },
};
