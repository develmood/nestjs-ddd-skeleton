# nestjs-ddd-skeleton

This project was generated using [Nx](https://nx.dev) and contains an interpretation of a DDD structure. Thanks to the folks at https://github.com/angular-architects/nx-ddd-plugin for inspiring me to develop a DDD interpretation for NestJS.

> Currently, the skeleton is still under construction, but can allready be used. Inspirations are allways welcome!

## tl,dr
```
git clone
cd nestjs-ddd-skeleton
npm i
docker-compose up
```

Copy `./config/env/example.env.dev` to `./config/.env.dev` and replace the values with your own configuration. A running database instance is needed.

```
npm start
```

## Features
- Global Configuration
- ORM
- Authentication
- DDD Structure
- Boundary Rules
- Custom Workspace Generator
- Containerized Mail server

### Global Configuration
> @nestjs/config

The project settings are made up of the following components:
- Environment variable
- Environment setting
- Config object
- Configuration service

When calling the `npm start` command, a global environment variable `APP_STAGE` is set and with this value the corresponding environment settings are loaded.

> Inspect the package.json for the npm start command!

**Example**: For the value `APP_STAGE=dev` you need an environment file with the path `./config/env/.env.dev`.

With this value the correct path can now be set for the `ConfigModule`.

> Inspect the app.module.ts,  with which values the ConfigModule is set

As you can see, in the `ConfigModule` the file `./config/configuration.ts` is included. Here the environment variables are assigned to usable properties, which can then be included in the code with the `ConfigService`.

### ORM

> @nestjs/typeorm && typeorm

In the shared area there is a library which is used to provide all entities. You can find more information about this topic here:

https://docs.nestjs.com/recipes/sql-typeorm#sql-typeorm

https://typeorm.io/

A conscious decision was made to store the entities in the shared area in order to avoid interdomain dependencies. A good example of this would be a UserID, which is probably used globally and would otherwise be stored in the onboarding domain, which would then create a dependency on many other domains.

But of course you are free in the decision to bind entities to domains.

### Authentication

> @nestjs/passport && passport

Standard implementation from https://docs.nestjs.com/security/authentication

### DDD Structure

In order to be able to map a DDD structure, a three-layer structure is used:

```
libs
-- my-domain-name
---- application
---- domain
---- infrastructure
```

Each layer is its own module, subject to certain rules. These rules are described in the following chapter.

### Boundary Rules

The boundary rules can be found in eslintrc.json on the root level in the configuration for `@nrwl/nx/enforce-module-boundaries`. Here it is described which dependencies of the different modules among each other are possible.

Unfortunately, at the moment these are only created for the domain itself. A configuration for the individual layers, which would definitely increase the code quality, would have to be created manually. However, this point will be automated in the near future.

### Custom Workspace Generator

In the `tools` section at root level you will find a generator for domains. This generator creates a folder with the structure described above and creates a basic boundary rule.

### Containerized Mail server
> Docker image: mailhog/mailhog

To relieve you of setting up an SMTP service during development time, a Docker image was set up with `mailhog`. You will need a running docker instance.

To start the service, execute the following command in the project ORdner at root level:

```
docker-compose up
```

You can find the web interface at `http://localhost:8025/`.
