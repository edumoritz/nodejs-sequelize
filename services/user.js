const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/ValidationError');
const models = require( '../models/index.js');

module.exports = (app) => {
    const findAll = async () => {
        return await models.User.findAll()
    };
    const findOne = async (filter = {}) => {
        const user = await models.User.findAll({where: filter});
        return user[0];
    };

    const getPasswdHash = (passwd) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(passwd, salt);
    }
    
    const save = async (user) => {
        
        if(!user.name) throw new ValidationError('Nome é um atributo obrigatório');
        if(!user.email) throw new ValidationError('Email é um atributo obrigatório');
        if(!user.passwd) throw new ValidationError('Senha é um atributo obrigatório');

        const userDb = await models.User.findAll({where: {email: user.email}});
        if(userDb.size > 0) throw new ValidationError('Já existe um usuário com esse email');
        
        user.passwd = getPasswdHash(user.passwd);
        const newUser = models.User.create({name: user.name, email: user.email, passwd: user.passwd});
        return newUser;
    };

    
    const update = async (id, body) => {
        const { name, email, passwd } = body;
        try {
          const result = await models.User.update({ name, email, passwd },{ where: { id }});
          
          return result[0]
        }catch (error) {
            throw new ValidationError(`Usuario ${name} não foi atualizado`);           
        }
        
    };

    const remove = async (id) => {
      try {
        await models.User.destroy({where: { id }});
        return true;
      } catch (error) {
        throw new ValidationError(`Erro na exclusão do usuario.`);            
      }
    };

    return { findAll, findOne, save, update, remove };
}