const ValidationError = require('../errors/ValidationError');
const models = require( '../models/index.js');

module.exports = (app) => {
  
    const findAll = () => {
      try {
          const products = models.Product.findAll()
          return products;
      } catch (err) {
          return ValidationError("Erro na listagem: ");
      }
    };

    const find = async (filter = {}) => {
      try {
        const product = await models.Product.findAll({where: filter});
        return product[0];
      } catch (err) {
          return ValidationError("Erro na busca: ");
      }
    };

    const save = async (product) => {        
        if(!product.name) throw new ValidationError('Nome é um atributo obrigatório');
        if(!product.quantity) throw new ValidationError('Quantidade é um atributo obrigatório');
        if(!product.value) throw new ValidationError('Valor é um atributo obrigatório');

        const findProduct = await models.Product.findAll({where: { name: product.name }})
        if(findProduct[0]) throw new ValidationError('Já um produto com esse nome');

        const newProduct = models.Product.create({
          name: product.name, 
          quantity: product.quantity, 
          value: product.value
        });
        return newProduct;
    };    

    const update = async (id, body) => {
        const { name, quantity, value } = body;
        try {
          const result = await models.Product.update({ name, quantity, value },{ where: { id }});
          
          return result[0]
        }catch (error) {
            throw new ValidationError(`Produto ${name} não foi atualizado`);           
        }
        
    };

    const remove = async (id) => {
      try {
        await models.Product.destroy({where: { id }});
        return true;
      } catch (error) {
        throw new ValidationError(`Erro na exclusão do produto.`);            
      }
    };

  return {findAll, find, save, update, remove}
}