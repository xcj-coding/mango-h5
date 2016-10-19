import React,{Component} from 'react';
import * as ReactDOM from 'react-dom';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import * as CM from '../common/component';
import {getDataFromAPI,Tips} from '../common/base';
import * as MGAction  from '../actions/index';

import {Link} from 'react-router';

const overseas = '{"code":"1","data":{"hot":[{"code":"137","name":"美国"},{"code":"132","name":"英国"},{"code":"118","name":"法国"},{"code":"123","name":"俄罗斯"},{"code":"75","name":"韩国"},{"code":"72","name":"日本"}],"countries":[{"code":"155","name":"喀麦隆","pinYin":"kamailong","simpleSpell":"k"},{"code":"154","name":"纳米比亚","pinYin":"namibiya","simpleSpell":"n"},{"code":"153","name":"马达加斯加","pinYin":"madajiasijia","simpleSpell":"m"},{"code":"156","name":"乌干达","pinYin":"wuganda","simpleSpell":"w"},{"code":"157","name":"多哥","pinYin":"duoge","simpleSpell":"d"},{"code":"158","name":"莫桑比克","pinYin":"mosangbike","simpleSpell":"m"},{"code":"159","name":"坦桑尼亚","pinYin":"tansangniya","simpleSpell":"t"},{"code":"160","name":"津巴布韦","pinYin":"jinbabuwei","simpleSpell":"j"},{"code":"161","name":"突尼斯","pinYin":"tunisi","simpleSpell":"t"},{"code":"162","name":"塞拉利昂","pinYin":"sailaliang","simpleSpell":"s"},{"code":"163","name":"几内亚比绍","pinYin":"jineiyabishao","simpleSpell":"j"},{"code":"164","name":"科特迪瓦","pinYin":"ketediwa","simpleSpell":"k"},{"code":"168","name":"斐济","pinYin":"feiji","simpleSpell":"f"},{"code":"167","name":"新西兰","pinYin":"xinxilan","simpleSpell":"x"},{"code":"166","name":"澳大利亚","pinYin":"aodaliya","simpleSpell":"a"},{"code":"138","name":"墨西哥","pinYin":"moxige","simpleSpell":"m"},{"code":"139","name":"阿根廷","pinYin":"agenting","simpleSpell":"a"},{"code":"140","name":"哥伦比亚","pinYin":"gelunbiya","simpleSpell":"g"},{"code":"137","name":"美国","pinYin":"meiguo","simpleSpell":"m"},{"code":"136","name":"加拿大","pinYin":"jianada","simpleSpell":"j"},{"code":"142","name":"古巴","pinYin":"guba","simpleSpell":"g"},{"code":"143","name":"海地","pinYin":"haidi","simpleSpell":"h"},{"code":"144","name":"秘鲁","pinYin":"bilu","simpleSpell":"b"},{"code":"141","name":"巴西","pinYin":"baxi","simpleSpell":"b"},{"code":"134","name":"卢森堡","pinYin":"lusenbao","simpleSpell":"l"},{"code":"133","name":"乌克兰","pinYin":"wukelan","simpleSpell":"w"},{"code":"132","name":"英国","pinYin":"yingguo","simpleSpell":"y"},{"code":"131","name":"意大利","pinYin":"yidali","simpleSpell":"y"},{"code":"130","name":"希腊","pinYin":"xila","simpleSpell":"x"},{"code":"129","name":"西班牙","pinYin":"xibanya","simpleSpell":"x"},{"code":"128","name":"马耳他","pinYin":"maerta","simpleSpell":"m"},{"code":"127","name":"土耳其","pinYin":"tuerqi","simpleSpell":"t"},{"code":"126","name":"保加利亚","pinYin":"baojialiya","simpleSpell":"b"},{"code":"125","name":"斯洛文尼亚","pinYin":"siluowenniya","simpleSpell":"s"},{"code":"124","name":"拉脱维亚","pinYin":"latuoweiya","simpleSpell":"l"},{"code":"123","name":"俄罗斯","pinYin":"eluosi","simpleSpell":"e"},{"code":"122","name":"葡萄牙","pinYin":"putaoya","simpleSpell":"p"},{"code":"121","name":"捷克","pinYin":"jieke","simpleSpell":"j"},{"code":"120","name":"荷兰","pinYin":"helan","simpleSpell":"h"},{"code":"119","name":"芬兰","pinYin":"fenlan","simpleSpell":"f"},{"code":"118","name":"法国","pinYin":"faguo","simpleSpell":"f"},{"code":"117","name":"德国","pinYin":"deguo","simpleSpell":"d"},{"code":"116","name":"丹麦","pinYin":"danmai","simpleSpell":"d"},{"code":"115","name":"大溪地","pinYin":"daxidi","simpleSpell":"d"},{"code":"114","name":"波兰","pinYin":"bolan","simpleSpell":"b"},{"code":"113","name":"冰岛","pinYin":"bingdao","simpleSpell":"b"},{"code":"112","name":"奥地利","pinYin":"aodili","simpleSpell":"a"},{"code":"111","name":"爱尔兰","pinYin":"aierlan","simpleSpell":"a"},{"code":"110","name":"匈牙利","pinYin":"xiongyali","simpleSpell":"x"},{"code":"109","name":"瑞士","pinYin":"ruishi","simpleSpell":"r"},{"code":"108","name":"瑞典","pinYin":"ruidian","simpleSpell":"r"},{"code":"107","name":"摩纳哥","pinYin":"monage","simpleSpell":"m"},{"code":"106","name":"比利时","pinYin":"bilishi","simpleSpell":"b"},{"code":"105","name":"爱沙尼亚","pinYin":"aishaniya","simpleSpell":"a"},{"code":"103","name":"哈萨克斯坦","pinYin":"hasakesitan","simpleSpell":"h"},{"code":"102","name":"约旦","pinYin":"yuedan","simpleSpell":"y"},{"code":"101","name":"吉尔吉斯斯坦","pinYin":"jierjijisitan","simpleSpell":"j"},{"code":"100","name":"卡塔尔","pinYin":"kataer","simpleSpell":"k"},{"code":"99","name":"蒙古","pinYin":"menggu","simpleSpell":"m"},{"code":"98","name":"阿曼","pinYin":"aman","simpleSpell":"a"},{"code":"97","name":"格鲁吉亚","pinYin":"gelujiya","simpleSpell":"g"},{"code":"96","name":"阿塞拜疆","pinYin":"asaibaijiang","simpleSpell":"a"},{"code":"95","name":"东帝汶","pinYin":"dongdiwen","simpleSpell":"d"},{"code":"94","name":"马尔代夫","pinYin":"maerdaifu","simpleSpell":"m"},{"code":"93","name":"巴林","pinYin":"balin","simpleSpell":"b"},{"code":"92","name":"文莱","pinYin":"wenlai","simpleSpell":"w"},{"code":"91","name":"巴基斯坦","pinYin":"bajisitan","simpleSpell":"b"},{"code":"90","name":"伊朗","pinYin":"yilang","simpleSpell":"y"},{"code":"89","name":"孟加拉","pinYin":"mengjiala","simpleSpell":"m"},{"code":"88","name":"阿联酋","pinYin":"alianqiu","simpleSpell":"a"},{"code":"87","name":"中国台湾","pinYin":"zhongguotaiwan","simpleSpell":"z"},{"code":"86","name":"黎巴嫩","pinYin":"libanen","simpleSpell":"l"},{"code":"85","name":"以色列","pinYin":"yiselie","simpleSpell":"y"},{"code":"84","name":"印度","pinYin":"yindu","simpleSpell":"y"},{"code":"83","name":"越南","pinYin":"yuenan","simpleSpell":"y"},{"code":"82","name":"尼泊尔","pinYin":"niboer","simpleSpell":"n"},{"code":"81","name":"新加坡","pinYin":"xinjiapo","simpleSpell":"x"},{"code":"80","name":"马来西亚","pinYin":"malaixiya","simpleSpell":"m"},{"code":"79","name":"柬埔寨","pinYin":"jianpuzhai","simpleSpell":"j"},{"code":"78","name":"斯里兰卡","pinYin":"sililanka","simpleSpell":"s"},{"code":"77","name":"菲律宾","pinYin":"feilvbin","simpleSpell":"f"},{"code":"76","name":"泰国","pinYin":"taiguo","simpleSpell":"t"},{"code":"75","name":"韩国","pinYin":"hanguo","simpleSpell":"h"},{"code":"74","name":"缅甸","pinYin":"miandian","simpleSpell":"m"},{"code":"73","name":"老挝","pinYin":"laowo","simpleSpell":"l"},{"code":"72","name":"日本"},{"code":"145","name":"智利","pinYin":"zhili","simpleSpell":"z"},{"code":"146","name":"厄瓜多尔","pinYin":"eguaduoer","simpleSpell":"e"},{"code":"147","name":"玻利维亚","pinYin":"boliweiya","simpleSpell":"b"},{"code":"149","name":"南非","pinYin":"nanfei","simpleSpell":"n"},{"code":"150","name":"埃及","pinYin":"aiji","simpleSpell":"a"},{"code":"151","name":"肯尼亚","pinYin":"kenniya","simpleSpell":"k"},{"code":"152","name":"赞比亚","pinYin":"zanbiya","simpleSpell":"z"}]}}';
const all = JSON.parse(overseas);
const allData = all.data;

var aNav = [];
for(let item of allData.countries){
	if(!aNav.includes(item.simpleSpell) && item.simpleSpell){
		aNav.push(item.simpleSpell)
	}
}
aNav.sort();
var newList = {},i;
for(let i of aNav){
	newList[i] = [];
	for(var item of allData.countries){
		if(item.simpleSpell == i){
			newList[i].push(item);
		}
	}
}
console.log(newList)
/**
 * 测试玩玩
 * 测试玩玩
 * 测试玩玩
 */
class ADDRESS extends Component{
	constructor(props){
		super(props)
		document.title = this.props.route.name;
	}
	componentWillMount(){

	}
	componentDidMount(){

	}
	render(){
		var newListString = '';
		for(let item in newList){
			// console.log(item)
			// console.log(newList[item])
			let lll = newList[item].map(function(item,i){
				return '<li>' + item.name + '</li>'
			})
			newListString += '<h3>' + item + '</h3><ul>' + lll + '</ul>';
		}
		// console.log(newListString);
		

		let aaa = [];
		for(let ccc in newList){
			let bbb = []
			newList[ccc].map(function(item,i){
				bbb.push(<li key={ccc + i}>{item.name}</li>) 
			})
			aaa.push(<div key={ccc}><h3 key={ccc + 'h3'}>{ccc}</h3><ul key={ccc + 'ul'}>{bbb}</ul></div>)
		}

		return (
			<div>
				<div className="hotData">
				{
					allData.hot.map((item,i)=>{
						return (
							<a style={{"marginRight":"10px","padding":"5px","display":"inline-block"}} key={i} name={item.code} href="javascript:;">{item.name}</a>
						)
					})
				}
				</div>
				<div className="navData">
					<ul>
						{
							// newList.map(function(item,i){
							// 	console.log(item)
							// 	console.log(i)
							// })

							// bbb
							// newListString
						}
					</ul>
				</div>
				<div className="listData">
					<ul>
						{
							aaa
						}
					</ul>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
    return {
        LOADINGTIP:state.RDcount.get('LOADINGTIP'),
        LOGINSTATE:state.RDcount.get('LOGINSTATE')
    };
};
function mapDispatchToProps(dispatch){
    return {
        ACTIONS:bindActionCreators(MGAction,dispatch)
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(ADDRESS);
