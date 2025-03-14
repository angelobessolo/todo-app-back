import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn()
    id: number; 

    // Relación de muchos a uno: una tarea pertenece a un único usuario
    @ManyToOne(() => User, (user) => user.tasks, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;
    
    @ApiProperty()
    @Column({ comment: 'Titulo' })  
    title: string;

    @ApiProperty()
    @Column({ comment: 'Descripción' })  
    description: string;

    @ApiProperty()
    @Column({ default: 'Pendiente', comment: 'Estado: Pendiente - Completado' })
    status: string;
  
    @ApiProperty()
    @Column({ type: 'date', default: () => "CURRENT_DATE", comment: 'Fecha de Creación' })  
    createAt: string; 

    @ApiProperty()
    @Column({ type: 'time', default: () => "CURRENT_TIME", comment: 'Hora de Creación' })  
    createTime: string;  

    @ApiProperty()
    @Column({ type: 'date', default: () => "CURRENT_DATE", comment: 'Fecha de Actualización' })  
    updateAt: string;  
    
    @ApiProperty()
    @Column({ type: 'time', default: () => "CURRENT_TIME", comment: 'Hora de Actualización' })  
    updateTime: string; 
}