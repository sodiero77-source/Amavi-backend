import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RequestContextGuard } from '../../common/guards/request-context.guard';
import { CreateTaskDto } from './dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(RequestContextGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Req() request: any, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(request.actorContext, dto);
  }

  @Get()
  list(@Req() request: any) {
    return this.tasksService.list(request.actorContext);
  }
}
