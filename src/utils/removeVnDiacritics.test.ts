import { expect, describe, it } from 'bun:test'
import { removeVnDiacritics } from './removeVnDiacritics'

describe('removeVnDiacritics', () => {
  it('removes diacritics', () => {
    const input = 'ăâáàảãạắằẳẵặấầẩẫậĂÂÁÀẢÃẠẮẰẲẴẶẤẦẨẪẬêéèẻẽẹếềểễệÊÉÈẺẼẸẾỀỂỄỆíìỉĩịÍÌỈĨỊôơóòỏõọốồổỗộớờởỡợÔƠÓÒỎÕỌỐỒỔỖỘỚỜỞỠỢưúùủũụứừửữựƯÚÙỦŨỤỨỪỬỮỰýỳỷỹỵÝỲỶỸỴđĐ'
    const expected = 'aaaaaaaaaaaaaaaaaAAAAAAAAAAAAAAAAAeeeeeeeeeeeEEEEEEEEEEEiiiiiIIIIIoooooooooooooooooOOOOOOOOOOOOOOOOOuuuuuuuuuuuUUUUUUUUUUUyyyyyYYYYYdD'
    expect(removeVnDiacritics(input)).toBe(expected)
  })

  it('remove diacritics from paragraph', () => {
    const input = 'Hôm nay, nhiều trẻ em cơi phim với chơi vi-đê-ô game. Một ngày, cái điện thoại với TV lấy mấy tiếng ra. Trẻ em không thể làm bài với làm việc ở nha tại vi trẻ em không đườc bở cái điện thoại xướng. Nhừng mà, mình đườc làm nhiều đô với cái mấy. Trẻ em đườc học nhiều đô dống tiếng anh ở trên điện thoại với'
    const expected = 'Hom nay, nhieu tre em coi phim voi choi vi-de-o game. Mot ngay, cai dien thoai voi TV lay may tieng ra. Tre em khong the lam bai voi lam viec o nha tai vi tre em khong duoc bo cai dien thoai xuong. Nhung ma, minh duoc lam nhieu do voi cai may. Tre em duoc hoc nhieu do dong tieng anh o tren dien thoai voi'
    expect(removeVnDiacritics(input)).toBe(expected)
  })
})
