const prisma = require('../config/prisma');

class InstituicaoRepository {

    async criar(dados) {
        return await prisma.Instituicao.create({
            data: dados
        });
    }

    async buscarPorId(id) {
        return await prisma.instituicao.findUnique({
        where: { id }
    });
    }

    async buscarPorEmail(email) {
        return await prisma.instituicao.findUnique({
            where: { email }
        });
    }

    async atualizar(id, dados) {
        return await prisma.instituicao.update({
            where: { id },
            data: dados,
        });
    }

    async deletar(id) {
        return await prisma.instituicao.delete({
            where: { id },
        });
    }

    async exibirTodos() {
        return await prisma.instituicao.findMany();
    }


}


module.exports = new InstituicaoRepository();