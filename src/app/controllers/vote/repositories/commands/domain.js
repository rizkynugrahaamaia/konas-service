
const Command = require('./command');
const Query = require('../queries/query');
const QueryUser = require('../../../user/repositories/queries/query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError, BadRequestError, ConflictError } = require('../../../../helpers/error');

class Vote {

  constructor(){
    this.query = new Query();
    this.queryUser = new QueryUser();
    this.command = new Command();
  }

  // Fungsi ini digunakan untuk menghasilkan kandidat berdasarkan data yang diberikan.
  async generateCandidate(payload) {
    // menerima parameter payload yang berisi data kandidat.
    const { candidate:data } = payload;

    // Menghapus semua data kandidat yang ada di database sebelum memproses yang baru.
    await this.command.deleteAllCandidate();

    // Loop pemeriksaan kandidat
    // Iterasi untuk setiap userId dalam array data.
    for(let userId of data){

      // Mencari data user berdasarkan userId.
      const user = await this.queryUser.findOneUser({ userId });

      // Jika user ditemukan (user.data ada), membuat dokumen kandidat 
      // yang berisi userId dan fullname.
      if(user.data) {

        const { fullname } = user.data;
        const document = { userId, fullname };

        // Mengecek apakah kandidat dengan userId tersebut sudah ada 
        // pada table candidates.
        const candidate = await this.query.findOneCandidate({ userId });

        //Jika tidak ada (ada error), maka menambahkan kandidat baru ke database.
        if(candidate.err) await this.command.insertOneCandidate(document);

      }
    }

    // Menggunakan query untuk mendapatkan semua kandidat.
    const { data:result } = await this.query.findManyCandidate();
    // Mengembalikan data dalam bentuk yang dibungkus (wrapper).
    return wrapper.data(result);
  }

  async generateVote(payload) {
    const { userId, candidateId } = payload;
    const voter = await this.query.findOneVote({ userId });
    if (voter.data) {
      return wrapper.error(new ConflictError('anda sudah melakukan vote'));
    }

    const candidate = await this.query.findOneCandidate({ userId: candidateId });
    if (candidate.err) {
      return wrapper.error(new NotFoundError('Kandidat belum terdaftar'));
    }

    const vote = await this.command.insertOneVote({ userId, candidateId });
    if (vote.err) {
      return wrapper.error(new BadRequestError('voting gagal'));
    }

    return wrapper.data(null);
  }

  async deleteCandidate() {

    const voter = await this.query.findManyVote();

    if (voter.data.length > 0) {
      const deleteVote = await this.command.deleteAllVote();
      if (deleteVote.err) {
        return wrapper.error(new BadRequestError('gagal menghapus vote'));
      }
    }

    const deleteCandidate = await this.command.deleteAllCandidate();

    if (deleteCandidate.err) {
      return wrapper.error(new BadRequestError('gagal menghapus kandidat'));
    }

    return wrapper.data(null);
  }

  async deleteVote() {

    const voter = await this.query.findManyVote();

    if (voter.data.length > 0) {
      const deleteVote = await this.command.deleteAllVote();
      if (deleteVote.err) {
        return wrapper.error(new BadRequestError('gagal menghapus vote'));
      }
    }else{
      return wrapper.error(new ConflictError('Vote kosong, tidak ada yang dihapus'));
    }

    return wrapper.data(null);
  }


}

module.exports = Vote;
