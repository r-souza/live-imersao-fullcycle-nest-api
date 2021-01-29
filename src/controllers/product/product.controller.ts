import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/models/product.model';
import { Repository } from 'typeorm';

@Controller('products')
export class ProductController {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ){}

    @Get()
    index() {
        return this.productRepository.find();
    }

    @Get(':id')
    show(@Param('id') id: string) {
        return this.productRepository.findOneOrFail(id);
    }

    @Post()
    store(@Body() body){
        const product = this.productRepository.create(body);
        
        return this.productRepository.save(product);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body) {
        const product = await this.productRepository.findOneOrFail(id);

        this.productRepository.update({id: +id}, body)

        return await this.productRepository.findOne(id);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        const product = await this.productRepository.findOneOrFail(id);

        return this.productRepository.delete(id);        
    }

    
}
