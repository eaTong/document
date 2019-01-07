/**
 * Created by eatong on 17-12-1.
 */
import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

class Editor extends Component {
  state = {mounted: false, value: '', loaded: false, unionKey: ''};

  componentDidMount() {

    this.setState({mounted: true, value: this.props.value, unionKey: `editor-container-${Math.random()}`});
    const bdPath = '/ueditor/';
    createScript(bdPath + 'ueditor.config.js')
      .then(() => createScript(bdPath + 'ueditor.all.js'))
      .then(() => createScript(bdPath + 'lang/zh-cn/zh-cn.js'))
      .then(() => {
        const width = findDOMNode(this.container).offsetWidth;
        const height = document.body.offsetHeight - 240;
        const config = {
          //菜单栏
          toolbars: [
            [
              'source', //源代码
              'anchor', //锚点
              'undo', //撤销
              'redo', //重做
              'bold', //加粗
              // 'snapscreen', //截图
              'italic', //斜体
              'underline', //下划线
              // 'indent', //首行缩进
              'strikethrough', //删除线
              'subscript', //下标
              'fontborder', //字符边框
              'superscript', //上标
              'formatmatch', //格式刷
              // 'blockquote', //引用
              'pasteplain', //纯文本粘贴模式
              'selectall', //全选
              // 'print', //打印
              'preview', //预览
              'horizontal', //分隔线
              'removeformat', //清除格式
              'time', //时间
              'date', //日期
              'link', //超链接
              'unlink', //取消链接
              // 'inserttable', //插入表格
              // 'insertrow', //前插入行
              // 'insertcol', //前插入列
              // 'mergeright', //右合并单元格
              // 'mergedown', //下合并单元格
              // 'deleterow', //删除行
              // 'deletecol', //删除列
              // 'splittorows', //拆分成行
              // 'splittocols', //拆分成列
              // 'splittocells', //完全拆分单元格
              // 'deletecaption', //删除表格标题
              // 'inserttitle', //插入标题
              // 'mergecells', //合并多个单元格
              // 'deletetable', //删除表格
              // 'cleardoc', //清空文档
              // 'insertparagraphbeforetable', //"表格前插入行"
              //'insertcode', //代码语言
              'fontfamily', //字体
              'fontsize', //字号
              'paragraph', //段落格式
              'simpleupload', //单图上传
              //'insertimage', //多图上传
              // 'edittable', //表格属性
              // 'edittd', //单元格属性
              //'emotion', //表情
              //'spechars', //特殊字符
              //'searchreplace', //查询替换
              'map', //Baidu地图
              'insertvideo', //视频
              // 'help', //帮助
              'justifyleft', //居左对齐
              'justifyright', //居右对齐
              'justifycenter', //居中对齐
              'justifyjustify', //两端对齐
              'forecolor', //字体颜色
              'backcolor', //背景色
              'insertorderedlist', //有序列表
              'insertunorderedlist', //无序列表
              'fullscreen', //全屏
              //'directionalityltr', //从左向右输入
              //'directionalityrtl', //从右向左输入
              'rowspacingtop', //段前距
              'rowspacingbottom', //段后距
              //'pagebreak', //分页
              'imagenone', //默认
              'imageleft', //左浮动
              'imageright', //右浮动
              // 'attachment', //附件
              'imagecenter', //居中
              //'wordimage', //图片转存
              'lineheight', //行间距
              //'edittip ', //编辑提示
              'customstyle', //自定义标题
              //'autotypeset', //自动排版
              //'touppercase', //字母大写
              //'tolowercase', //字母小写
              // 'background', //背景
            ]
          ],
          //自动保存
          enableAutoSave: false,
          //字号
          fontsize: [12, 14, 16, 18, 20, 24, 36],
          //初始宽度
          initialFrameWidth: width,
          //初始高度
          initialFrameHeight: height,
          //自动长高
          autoHeightEnabled: true,
          //初始风格
          initialStyle: 'p{line-height:1em; font-size: 12px; }'
        };
        this.editor = UE.getEditor(this.state.unionKey, config);


        if (this.props.value) {
          this.editor.ready(() => {
            this.editor.setContent(this.props.value);
          });
        }
      });

  }

  render() {
    if (this.state.mounted) {
      return (
        <div
          ref={container => this.container = container}
          className={`editor-container ${this.props.className || ''}`}
          id={this.state.unionKey}
        />
      )
    } else {
      return (<textarea/>)
    }
  }
}

function createScript(path) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.onload = () => {
      resolve();
    };
    script.src = path;
    document.body.appendChild(script);

  });
}


Editor.propTypes = {};
export default Editor;
