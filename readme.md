Name for PlanetScale database: ecomm-db  


schema.prisma file contains:  
```
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["referentialIntegrity"]
}

datasource db {
  provider = "mysql"
  url = env("DATABASE_URL")
  referentialIntegrity = "prisma"
}
```
