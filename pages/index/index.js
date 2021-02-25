// index.js
// 获取应用实例
const app = getApp()
import { pinyinUtil } from '../../utils/pinyinUtil.js';

Page({
  data: {
    // 联系人列表-源列表
    // 注意：当前程序是以"name"作为唯一值，也就是有同命的情况可能会出现Bug
    // 正常做法是每一条联系人有一个唯一id，用id去修改联系人的信息
    contact_source: [
      { name: '刘一', sex: '男', phone: '18080808080', avatar: null, department: '数信学院', wechat: '66666', discipline: '软件工程' },
      { name: '陈二', sex: '男', phone: '12080808080', avatar: null, department: '数信学院', wechat: '12366', discipline: '软件工程' },
      { name: '张三', sex: '男', phone: '13080808080', avatar: null, department: '数信学院', wechat: '86666', discipline: '信息管理与信息系统' },
      { name: '李四', sex: '女', phone: '14080808080', avatar: null, department: '数信学院', wechat: '5666', discipline: '信息管理与信息系统' },
      { name: '王五', sex: '女', phone: '15080808080', avatar: null, department: '数信学院', wechat: '3666', discipline: '信息管理与信息系统' },
      { name: '赵六', sex: '男', phone: '18080808080', avatar: null, department: '数信学院', wechat: '2886666', discipline: '信息管理与信息系统' },
      { name: '孙七', sex: '男', phone: '17080808080', avatar: null, department: '数信学院', wechat: '26666', discipline: '计算机科学与技术' },
      { name: '周八', sex: '女', phone: '18080808080', avatar: null, department: '数信学院', wechat: '1666', discipline: '计算机科学与技术' },
      { name: '吴九', sex: '男', phone: '18080808080', avatar: null, department: '数信学院', wechat: '1866', discipline: '计算机科学与技术' },
      { name: '郑十', sex: '女', phone: '18080808080', avatar: null, department: '数信学院', wechat: '8886666', discipline: '计算机科学与技术' },
      { name: '麻子', sex: '男', phone: '18080808080', avatar: null, department: '数信学院', wechat: '0777666', discipline: '计算机科学与技术' },
      { name: '熊大', sex: '男', phone: '18080808080', avatar: null, department: '数信学院', wechat: '586666', discipline: '计算机科学与技术' },
      { name: '熊二', sex: '男', phone: '18080808080', avatar: null, department: '数信学院', wechat: '486666', discipline: '计算机科学与技术' },
    ],
    // 处理后的列表(带字母标签)
    contact: {},
    contact_length: 0,
  },

  onLoad() {
    this.formatContaca(this.data.contact_source)
  },

  // 整理联系人列表，添加首字母标签
  formatContaca: function (params) {
    let list = {}, source = {}, letter = [];
    for (const item of params) {
      // 获取联系人名称的汉字的首字母
      let firstLetter = pinyinUtil.getFirstLetter(item.name[0])
      if (!source[firstLetter]) source[firstLetter] = []
      source[firstLetter].push(item)

      // 添加首字母到letter数组中
      if (letter.indexOf(firstLetter) == -1) letter.push(firstLetter)
    }

    // 对letter数组进行排序
    letter = letter.sort()
    // 根据字母排序再次整理联系人列表
    for (const item of letter) {
      list[item] = source[item]
    }

    this.setData({ contact: list, contact_length: Object.keys(list).length })
  },

  searchName: function (params) {
    let list = [], value = params.detail.value;
    // 输入搜索内容时
    if (value) {
      for (const item of this.data.contact_source) {
        if (item.name.indexOf(value) != -1) list.push(item)
      }
      this.formatContaca(list)
    }
    // 搜索内容为空时
    else this.formatContaca(this.data.contact_source)
  },

  GoToPage: function (event) {
    // 配置要跳转的页面
    let page = 'info',
      url = '../' + page + "/" + page + "?",
      dataset = event.currentTarget.dataset,
      name = dataset.name;

    // 获取联系人信息，用于跳转时传参
    // 注意：当前程序是以"name"作为唯一值，也就是有同命的情况可能会出现Bug
    // 正常做法是每一条联系人有一个唯一id，用id去获取联系人的信息
    let info;
    for (const item of this.data.contact_source) {
      if (item.name == name) info = item
    }

    for (const key in info) { url = url + '&' + key + '=' + info[key] }
    if (page) { wx.navigateTo({ url: url }) }
  },

})
