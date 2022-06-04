const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 }
]

const GET_GOODS_ITEMS =
  'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
const GET_BASKET_GOODS_ITEMS =
  'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json'

function service (url, callback) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.send()
  xhr.onload = () => {
    {
      callback(JSON.parse(xhr.response))
    }
  }
}

class GoodsItem {
  constructor ({ product_name, price }) {
    this.product_name = product_name
    this.price = price
  }
  render () {
    return `
    <div class="goods-item">
      <h3>${this.product_name}</h3>
      <p>${this.price}</p>
    </div>
  `
  }
}

class GoodsList {
  items = []
  filteredItems = []
  fetchGoods (callback) {
    service(GET_GOODS_ITEMS, data => {
      this.items = data
      this.filteredItems = data
      callback()
    })
  }

  filterItems (value) {
    this.filteredItems = this.items.filter(({ product_name }) => {
      return product_name.match(new RegExp(value, 'gui'))
    })
  }
  countGoodsList () {
    return this.items.reduce((prev, { price }) => {
      return prev + price
    }, 0)
  }
  render () {
    const goods = this.filteredItems
      .map(item => {
        const goodItem = new GoodsItem(item)
        return goodItem.render()
      })
      .join('')
    document.querySelector('.goods-list').innerHTML = goods
  }
}

class NewGoodsUrl {
  items = []
  fetchGoods () {
    service(GET_BASKET_GOODS_ITEMS, data => {
      this.items = data.contents
    })
  }
}

const goodsList = new GoodsList()
goodsList.fetchGoods(() => {
  goodsList.render()
})

const newGoodsUrl = new NewGoodsUrl()
newGoodsUrl.fetchGoods()
