import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Get()
  async index(@Res() res, @Req() req) {
    return res.render('meeting', {
      user: req.user,
      allSetting: await this.meetingService.allSetting(),
      allUsers: await this.meetingService.allUsers(req.user.id)
    });
  }


  @Post('add')
  create(@Body() CreateMeetingDto: CreateMeetingDto, @Req() req){

    CreateMeetingDto.toplantiSahibi = req.user.id

    return this.meetingService.create(CreateMeetingDto)

  }


  @Post('list')
  async toplantilar(@Req() req) {
    const toplantilar= await this.meetingService.findAll(req.user.id);

    const dataArray = [];

    toplantilar.forEach(function (key, value) {
      const simple = {
        toplantiAdi: key.toplantiAdi,
        toplantiKonusu:key.toplantiKonusu,
        toplantiZamani: key.toplantiZamani,
        id: key.id,
      };

      dataArray.push(simple);
    });

    return {
      data: dataArray,
    };
  }




  @Post('toplantilarim')
  async toplantilarim(@Req() req) {
    const dataArray = [];

    const toplantilar = await this.meetingService.toplantilarim(req.user.id);

    // console.log(toplantilar)

    


    toplantilar.forEach(function (key, value) {
      const simple = {
        toplantiAdi: key.toplantiId['toplantiAdi'],
        toplantiKonusu: key.toplantiId['toplantiKonusu'],
        toplantiZamani: key.toplantiId['toplantiZamani'],
        toplantiDurumu: key.katilimDurumu,
        toplantiBittimi: key.toplantiId['toplantiBittimi'],
        oylama:key.oylama,
        id: key.id,
      };

      

      dataArray.push(simple);
    });


   

    return {
      data: dataArray,
    };


  }

@Post('tarihListele')
  async tarihListele(@Body() body){
  
  let tarihler = await this.meetingService.findOne(body.id)

  let tarih = tarihler[0].toplantiId['toplantiZamani'].split(",")

  return  {
    tarihler: tarih,
    id: tarihler[0].id
  }
}


@Post('toplantitarihlistele')
  async meetingdatelist(@Body() body){
  
  let tarihler = await this.meetingService.findOneMeeting(body.id)

  let tarih = tarihler[0].toplantiZamani.split(",")

  return  {
    tarihler: tarih,
    id: tarihler[0].id
  }
}


  @Patch('toplantidurumuguncelle')
  toplantiDurumuGuncelle(@Body() payload){


    let deneme = {
      id: payload.id,
      katilimDurumu : true,
      seciliZaman:payload.tarih
    }

    return this.meetingService.toplantidurumguncelle(deneme)

  }

  
  @Patch('updatemeeting')
  updatemeeting(@Body() payload){


    let deneme = {
      id: payload.id,
      toplantiZamani:payload.tarih.trim(),
      toplantiOkey: true,
      toplantiBittimi:payload.toplantiBittimi
    }

    return this.meetingService.updatemeeting(deneme)

  }

  @Post('details')
  async details(@Body() payload){

    let deneme = await this.meetingService.details(payload.id)

    // console.log(deneme)

    let dizi = []

    deneme.forEach(function(element){

      let katilimcilar = {
        adi: element.katilimciId['name'] +"  "+ element.katilimciId['lastname'],
        tarih: element.seciliZaman.trim(),
        oylama:element.oylama
      }

      dizi.push(katilimcilar)
    })

    return dizi
  }


  @Patch('oylama')
  async oylama(@Body() payload){
    return await this.meetingService.oylama(payload)
  }
  
}
