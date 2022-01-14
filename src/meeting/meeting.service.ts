import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { SettingsService } from 'src/settings/settings.service';
import { Repository } from 'typeorm';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting } from './entities/meeting.entity';
import { toplantiDurumlari } from './entities/toplantiDurumlari.entity';
import { string } from 'joi';

@Injectable()
export class MeetingService {

  constructor(
    @InjectRepository(Meeting) private MeetingRespository: Repository<Meeting>,
    private readonly UsersService: UsersService,
    @InjectRepository(toplantiDurumlari)
    private ToplantiDurumlari: Repository<toplantiDurumlari>,
    private readonly SettingsService: SettingsService){}

  async create(createMeetingDto: CreateMeetingDto) {

    const toplanti = await this.MeetingRespository.create(createMeetingDto);
    const toplantiKayit = await this.MeetingRespository.save(toplanti);

    if(typeof createMeetingDto.katilimcilar === 'string'){
      console.log('stri')
    }else if(typeof createMeetingDto.katilimcilar=== 'object'){

      for (let index = 0; index < createMeetingDto.katilimcilar.length; index++) {

        let toplantiDurumu = {
          toplantiId: toplantiKayit.id,
          katilimciId: toplantiKayit.katilimcilar[index],
          seciliZaman: "",
          oylama:0
        }


        const toplantiDurum = await this.ToplantiDurumlari.create(JSON.parse(JSON.stringify(toplantiDurumu)));
        const toplantıDurumKayit = await this.ToplantiDurumlari.save(toplantiDurum);
      
      }

    }
    
    return

  }

  async findAll(userId) {
    return await this.MeetingRespository.find({ where: { deleted: false , toplantiSahibi:userId} });
  }



  async toplantilarim(userId){
    return await this.ToplantiDurumlari.find({relations: ['toplantiId'], where:{deleted:false, katilimciId:userId}})

  }


  async toplantidurumguncelle(payload){
    return await this.ToplantiDurumlari.update(payload.id, payload)
  }

  async updatemeeting(payload){
    return await this.MeetingRespository.update(payload.id, payload)
  }
  async details(id){
    return await this.ToplantiDurumlari.find({relations: ['katilimciId'] ,where:{deleted:false, toplantiId:id}})
  }

  async oylama(payload){
    return await this.ToplantiDurumlari.update(payload.id, payload)
  }

  async findOne(id) {
    return await this.ToplantiDurumlari.find({relations: ['toplantiId'] ,where:{deleted:false, id:id}})
    
  }

  async findOneMeeting(id) {
    return await this.MeetingRespository.find({where:{deleted:false, id:id}})
    
  }

  update(id: number, updateMeetingDto: UpdateMeetingDto) {
    return `This action updates a #${id} meeting`;
  }

  remove(id: number) {
    return `This action removes a #${id} meeting`;
  }

  async allUsers(id){
    let allUser = await this.UsersService.findAll()

    let dizi = []


    allUser.forEach(element=>{
      if(element.id!=id){
        dizi.push(element)
      }
    })

    return dizi
  }

  async allSetting(){
    return await this.SettingsService.findAll()
  }
}
