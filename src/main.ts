import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";
import hbs = require("hbs");
import * as cookieParser from "cookie-parser";
import { CookieAuthGuard } from "./auth/auth.guard";
import { HttpExceptionFilter } from "./http-exception.filter";


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, "..", "public"));

  app.setBaseViewsDir(join(__dirname, "..", "views"));

  app.setViewEngine("hbs");

  hbs.registerPartials(join(__dirname, "..", "views", "inc"));

  app.use(cookieParser());

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalGuards(new CookieAuthGuard());

  hbs.registerHelper("bold", function(yetki) {
    if(yetki.fn(this)==0){
      
    }else{
      return new hbs.SafeString('<li><a href="/users"><i class="fa fa-user"></i> Kullanıcı </a></li> <li><a href="/settings"><i class="fa fa-gear"></i> Ayarlar </a></li>');
      
    }
  });


  await app.listen(3000);
}

bootstrap();
