const path = require('path');
const fs = require('fs');

const {prompt, toCamelCase, toPascalCase} = require('./util');

const moduleTemplate = (moduleNameKebab) => `import {Module} from '@nestjs/common';
import {${toPascalCase(moduleNameKebab)}Controller} from './${moduleNameKebab}.controller';
import {${toPascalCase(moduleNameKebab)}Service} from './${moduleNameKebab}.service';

@Module({
  imports: [],
  controllers: [${toPascalCase(moduleNameKebab)}Controller],
  providers: [${toPascalCase(moduleNameKebab)}Service],
})
export class ${toPascalCase(moduleNameKebab)}Module {}
`;

const controllerTemplate = (moduleNameKebab) => `import {Controller, Get, Post, Put, Delete} from '@nestjs/common';
import {${toPascalCase(moduleNameKebab)}Service} from './${moduleNameKebab}.service';

@Controller('${moduleNameKebab}')
export class ${toPascalCase(moduleNameKebab)}Controller {
  constructor(private readonly ${toCamelCase(moduleNameKebab)}Service: ${toPascalCase(moduleNameKebab)}Service) {}
}
`;

const controllerSpecTemplate = (moduleNameKebab) => `import {Test, TestingModule} from '@nestjs/testing';
import {${toPascalCase(moduleNameKebab)}Controller} from './${moduleNameKebab}.controller';
import {${toPascalCase(moduleNameKebab)}Service} from './${moduleNameKebab}.service';

describe('${toPascalCase(moduleNameKebab)}Controller', () => {
  let ${toCamelCase(moduleNameKebab)}Controller: ${toPascalCase(moduleNameKebab)}Controller;

  beforeEach(async () => {
    const ${toCamelCase(moduleNameKebab)}: TestingModule = await Test.createTestingModule({
      controllers: [${toPascalCase(moduleNameKebab)}Controller],
      providers: [${toPascalCase(moduleNameKebab)}Service],
    }).compile();

    ${toCamelCase(moduleNameKebab)}Controller = ${toCamelCase(moduleNameKebab)}.get<${toPascalCase(moduleNameKebab)}Controller>(${toPascalCase(moduleNameKebab)}Controller);
  });

  describe('', () => {
    it('', () => {
    });
  });
});
`;

const serviceTemplate = (moduleNameKebab) => `import {Injectable} from '@nestjs/common';

@Injectable()
export class ${toPascalCase(moduleNameKebab)}Service {
}
`;

const main = async () => {
  const moduleName = await prompt('Название модуля в kebab-case: ');
  const modulePath = path.join(__dirname, `../src/${moduleName}`);

  if (fs.existsSync(modulePath)) {
    console.log(`${moduleName} module is exist`);
    process.exit();
  }

  fs.mkdirSync(modulePath);
  fs.mkdirSync(path.join(modulePath, 'dto'));
  fs.mkdirSync(path.join(modulePath, 'schemas'));
  fs.writeFileSync(path.join(modulePath, `${moduleName}.controller.ts`), controllerTemplate(moduleName));
  fs.writeFileSync(path.join(modulePath, `${moduleName}.controller.spec.ts`), controllerSpecTemplate(moduleName));
  fs.writeFileSync(path.join(modulePath, `${moduleName}.module.ts`), moduleTemplate(moduleName));
  fs.writeFileSync(path.join(modulePath, `${moduleName}.service.ts`), serviceTemplate(moduleName));

  console.log('module created successfully')
};

main();
