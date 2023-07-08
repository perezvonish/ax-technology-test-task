import {Controller, Get} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";

@ApiTags("Heath")
@Controller("heath")
export class HeathController {
    @Get()
    checkHeath() {
        return true
    }
}