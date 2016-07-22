import React,{Component} from 'react';
import {bindActionCreators } from 'redux';
import {connect} from 'react-redux';

import {MgHeader,LoadingTip,Address} from '../common/component';
import {getDataFromAPI} from '../common/base';
import * as MGAction  from '../actions/index';

import {Link} from 'react-router';

class ADDRESS extends Component{
	constructor(props){
		super(props)
		document.title = this.props.route.name
		this.state = this.props;
	}
	componentWillMount(){
		const ADDRESS_INIT = []
	}
	componentDidMount(){
		this.setState({LOADINGTIP:false})
	}
	render(){
		return (
			<div>
				{
					this.state.LOADINGTIP ? (
						<LoadingTip />
					) : (
						<div>
							<sub>111</sub>
							<sup>222</sup>
							<input type="text" value="" placeholder="fqfqfq" />
							<MgHeader headerTitle="跟团游" gotoBack={true} />
							<div data-role="page" title="选择出发地">
							    <header>
							        <a href="javascript:void(0);" className="l-nav ui-icon-back" ng-back-button></a>
							        <span id="setCity">选择出发地</span>
							        <a href="/" className="l-nav ui-icon-home"></a>
							    </header>
							    <section className="l-content">
							        <div className="l-search clearfix">
							            <input type="search" id="search" name="search" value="" placeholder="输入中文名或简称"/>

							            <div className="l-list-wrapper">
							                <ul className="c-list c-search clearfix"></ul>
							            </div>
							        </div>

							        <div className="c-tab">
							            <ul className="c-tab-nav">
							                <li className="active" data-tab="hotcity"><a href="javascript:void(0)">热门城市</a></li>
							                <li data-tab="historycity"><a href="javascript:void(0)">历史城市</a></li>
							            </ul>
							            <ul className="c-list clearfix" id="hotcity">
							                <li data-id="3481">北京</li>
							                <li data-id="3501">上海</li>
							                <li data-id="3461">广州</li>
							                <li data-id="3441">深圳</li>
							                <li data-id="1721">成都</li>
							                <li data-id="3462">杭州</li>
							                <li data-id="462">长沙</li>
							                <li data-id="46">重庆</li>
							                <li data-id="40">昆明</li>
							                <li data-id="31">西安</li>
							                <li data-id="33">南京</li>
							                <li data-id="32">青岛</li>
							                <li data-id="8">三亚</li>
							                <li data-id="36">厦门</li>
							            </ul>
							            <ul className="c-list none clearfix" id="historycity">
							                <li>武汉</li>
							                <li>长沙</li>
							                <li>杭州</li>
							                <li>重庆</li>
							                <li>南京</li>
							            </ul>
							        </div>

							        <div className="c-title">更多城市</div>
							        <ul className="c-list c-list-letter clearfix" id="c-list-nav">
							            <li><a href="javascript:void(0)">A</a></li>
							            <li><a href="javascript:void(0)">B</a></li>
							            <li><a href="javascript:void(0)">C</a></li>
							            <li><a href="javascript:void(0)">D</a></li>
							            <li><a href="javascript:void(0)">E</a></li>
							            <li><a href="javascript:void(0)">F</a></li>
							            <li><a href="javascript:void(0)">G</a></li>
							            <li><a href="javascript:void(0)">H</a></li>
							            <li><a href="javascript:void(0)">J</a></li>
							            <li><a href="javascript:void(0)">K</a></li>
							            <li><a href="javascript:void(0)">L</a></li>
							            <li><a href="javascript:void(0)">M</a></li>
							            <li><a href="javascript:void(0)">N</a></li>
							            <li><a href="javascript:void(0)">P</a></li>
							            <li><a href="javascript:void(0)">Q</a></li>
							            <li><a href="javascript:void(0)">R</a></li>
							            <li><a href="javascript:void(0)">S</a></li>
							            <li><a href="javascript:void(0)">T</a></li>
							            <li><a href="javascript:void(0)">W</a></li>
							            <li><a href="javascript:void(0)">X</a></li>
							            <li><a href="javascript:void(0)">Y</a></li>
							            <li><a href="javascript:void(0)">Z</a></li>
							            <li></li>
							        </ul>

							        <div className="c-list-wrapper">
							            <div id="city-wrap">
							                <div className="city-box">
							                    <div className="c-title" id="A">A</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="309">安吉</li>
							                        <li data-id="6862">安徽</li>
							                        <li data-id="2521">安顺</li>
							                        <li data-id="5741">阿尔山</li>
							                        <li data-id="501">阿勒泰</li>
							                        <li data-id="3901">安宁</li>
							                        <li data-id="5581">安庆</li>
							                        <li data-id="6495">阿坝州</li>
							                        <li data-id="7279">阿克苏</li>
							                        <li data-id="7280">阿拉善盟</li>
							                        <li data-id="7283">阿拉尔</li>
							                        <li data-id="7291">鞍山</li>
							                        <li data-id="7304">阿坝</li>
							                        <li data-id="7309">安阳</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="B">B</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="3481">北京</li>
							                        <li data-id="7193">巴马</li>
							                        <li data-id="182">北戴河</li>
							                        <li data-id="612">包头</li>
							                        <li data-id="681">北海</li>
							                        <li data-id="5701">保定</li>
							                        <li data-id="521">北京郊区</li>
							                        <li data-id="3581">布尔津</li>
							                        <li data-id="5983">坝上</li>
							                        <li data-id="65">博鳌</li>
							                        <li data-id="1861">保亭</li>
							                        <li data-id="5961">白洋淀</li>
							                        <li data-id="7263">蚌埠</li>
							                        <li data-id="7276">巴中</li>
							                        <li data-id="7298">保山</li>
							                        <li data-id="7314">宝鸡</li>
							                        <li data-id="7315">白银</li>
							                        <li data-id="7323">亳州</li>
							                        <li data-id="7355">白山</li>
							                        <li data-id="7357">本溪</li>
							                        <li data-id="7365">巴彦淖尔市</li>
							                        <li data-id="7372">毕节</li>
							                        <li data-id="7374">百色</li>
							                        <li data-id="7406">巴音郭楞</li>
							                        <li data-id="7415">滨州</li>
							                        <li data-id="7417">博尔塔拉</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="C">C</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="1721">成都</li>
							                        <li data-id="462">长沙</li>
							                        <li data-id="46">重庆</li>
							                        <li data-id="3081">楚雄</li>
							                        <li data-id="4461">川主寺</li>
							                        <li data-id="364">常州</li>
							                        <li data-id="722">从化</li>
							                        <li data-id="1581">承德</li>
							                        <li data-id="7405">潮州</li>
							                        <li data-id="366">崇明</li>
							                        <li data-id="481">朝阳区</li>
							                        <li data-id="682">常熟</li>
							                        <li data-id="2241">常德</li>
							                        <li data-id="3801">郴州</li>
							                        <li data-id="4841">巢湖</li>
							                        <li data-id="5341">赤峰</li>
							                        <li data-id="6487">崇州</li>
							                        <li data-id="7081">沧州</li>
							                        <li data-id="7264">昌都</li>
							                        <li data-id="7330">滁州</li>
							                        <li data-id="7358">池州</li>
							                        <li data-id="7381">澄迈县</li>
							                        <li data-id="7397">崇左</li>
							                        <li data-id="7408">昌吉</li>
							                        <li data-id="7418">朝阳</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="D">D</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="3281">都江堰</li>
							                        <li data-id="50">东莞</li>
							                        <li data-id="5861">登封</li>
							                        <li data-id="608">丹东</li>
							                        <li data-id="37">大连</li>
							                        <li data-id="408">大同</li>
							                        <li data-id="2501">大理</li>
							                        <li data-id="536">迪士尼乐园</li>
							                        <li data-id="701">德天</li>
							                        <li data-id="3203">敦煌</li>
							                        <li data-id="310">岱山</li>
							                        <li data-id="523">德庆</li>
							                        <li data-id="641">东山岛</li>
							                        <li data-id="1401">迪庆</li>
							                        <li data-id="3261">大英县</li>
							                        <li data-id="6141">大厂</li>
							                        <li data-id="6486">德阳</li>
							                        <li data-id="7266">德宏</li>
							                        <li data-id="7281">大兴安岭</li>
							                        <li data-id="7293">定西</li>
							                        <li data-id="7303">达州</li>
							                        <li data-id="7364">大庆</li>
							                        <li data-id="7375">儋州</li>
							                        <li data-id="7388">东营</li>
							                        <li data-id="7394">德州</li>
							                        <li data-id="7421">定安县</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="E">E</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="440">峨眉山</li>
							                        <li data-id="526">恩平</li>
							                        <li data-id="4642">鄂尔多斯</li>
							                        <li data-id="7201">额尔古纳</li>
							                        <li data-id="7300">鄂州</li>
							                        <li data-id="7404">恩施</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="F">F</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="64">番禺</li>
							                        <li data-id="104">凤凰</li>
							                        <li data-id="82">佛山</li>
							                        <li data-id="2601">福州</li>
							                        <li data-id="27">佛冈</li>
							                        <li data-id="361">富阳</li>
							                        <li data-id="404">丰宁</li>
							                        <li data-id="524">封开</li>
							                        <li data-id="1741">枫泾</li>
							                        <li data-id="6861">福建</li>
							                        <li data-id="6981">抚顺</li>
							                        <li data-id="7274">抚州</li>
							                        <li data-id="7370">阜新</li>
							                        <li data-id="7392">防城港</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="G">G</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="3461">广州</li>
							                        <li data-id="41">桂林</li>
							                        <li data-id="6707">广西</li>
							                        <li data-id="662">贵阳</li>
							                        <li data-id="6870">贵州</li>
							                        <li data-id="6876">甘肃</li>
							                        <li data-id="6921">古东</li>
							                        <li data-id="3341">广元</li>
							                        <li data-id="3622">沽源</li>
							                        <li data-id="4801">赣州</li>
							                        <li data-id="6494">广安</li>
							                        <li data-id="6497">甘孜州</li>
							                        <li data-id="6701">广东</li>
							                        <li data-id="7122">固安</li>
							                        <li data-id="7269">固原</li>
							                        <li data-id="7361">甘南</li>
							                        <li data-id="7399">甘孜</li>
							                        <li data-id="7423">贵港</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="H">H</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="3462">杭州</li>
							                        <li data-id="66">海口</li>
							                        <li data-id="530">河源</li>
							                        <li data-id="5541">贺州</li>
							                        <li data-id="1621">衡阳</li>
							                        <li data-id="529">惠州</li>
							                        <li data-id="6941">华东</li>
							                        <li data-id="4341">黄龙</li>
							                        <li data-id="537">海洋公园</li>
							                        <li data-id="4101">华山</li>
							                        <li data-id="5321">合肥</li>
							                        <li data-id="44">黄山</li>
							                        <li data-id="62">惠东</li>
							                        <li data-id="201">哈尔滨</li>
							                        <li data-id="314">湖州</li>
							                        <li data-id="2361">黄山景区</li>
							                        <li data-id="4641">呼和浩特</li>
							                        <li data-id="6041">怀来</li>
							                        <li data-id="6703">海南</li>
							                        <li data-id="6869">湖南</li>
							                        <li data-id="15">惠州市</li>
							                        <li data-id="1561">海拉尔</li>
							                        <li data-id="5721">呼伦贝尔</li>
							                        <li data-id="6868">湖北</li>
							                        <li data-id="7377">怀化</li>
							                        <li data-id="24">花都</li>
							                        <li data-id="202">虎头湾</li>
							                        <li data-id="330">横店</li>
							                        <li data-id="522">怀集</li>
							                        <li data-id="2662">海螺沟</li>
							                        <li data-id="3941">花水湾</li>
							                        <li data-id="6001">海宁</li>
							                        <li data-id="6484">华蓥</li>
							                        <li data-id="6863">河北</li>
							                        <li data-id="6866">河南</li>
							                        <li data-id="6878">黑龙江</li>
							                        <li data-id="7061">怀来县</li>
							                        <li data-id="7267">海南藏族</li>
							                        <li data-id="7268">河池</li>
							                        <li data-id="7275">葫芦岛</li>
							                        <li data-id="7288">海东</li>
							                        <li data-id="7306">菏泽</li>
							                        <li data-id="7307">哈密</li>
							                        <li data-id="7324">淮安</li>
							                        <li data-id="7368">鹤壁</li>
							                        <li data-id="7383">汉中</li>
							                        <li data-id="7387">衡水</li>
							                        <li data-id="7403">海北</li>
							                        <li data-id="7411">邯郸</li>
							                        <li data-id="7412">黑河</li>
							                        <li data-id="7413">黄冈</li>
							                        <li data-id="7422">红河</li>
							                        <li data-id="7427">鹤岗</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="J">J</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="51">九寨沟</li>
							                        <li data-id="242">济南</li>
							                        <li data-id="741">江门</li>
							                        <li data-id="103">吉首</li>
							                        <li data-id="56">九江</li>
							                        <li data-id="2221">景德镇</li>
							                        <li data-id="3722">吉林</li>
							                        <li data-id="6705">江苏</li>
							                        <li data-id="7318">揭阳</li>
							                        <li data-id="7581">建水</li>
							                        <li data-id="3201">嘉峪关</li>
							                        <li data-id="5801">九华山</li>
							                        <li data-id="6761">江西</li>
							                        <li data-id="52">井冈山</li>
							                        <li data-id="305">建德</li>
							                        <li data-id="363">金华</li>
							                        <li data-id="610">锦州</li>
							                        <li data-id="901">嘉兴</li>
							                        <li data-id="1161">晋中</li>
							                        <li data-id="1382">景洪</li>
							                        <li data-id="3321">济宁</li>
							                        <li data-id="3361">介休</li>
							                        <li data-id="4281">嘉善</li>
							                        <li data-id="5481">缙云</li>
							                        <li data-id="5601">江阴</li>
							                        <li data-id="5621">焦作</li>
							                        <li data-id="6867">鸡公山</li>
							                        <li data-id="7278">济源</li>
							                        <li data-id="7289">晋城</li>
							                        <li data-id="7326">吉安</li>
							                        <li data-id="7338">佳木斯</li>
							                        <li data-id="7347">酒泉</li>
							                        <li data-id="7389">荆州</li>
							                        <li data-id="7410">荆门</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="K">K</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="40">昆明</li>
							                        <li data-id="7343">开封</li>
							                        <li data-id="5522">康定</li>
							                        <li data-id="4881">开平</li>
							                        <li data-id="3582">喀纳斯</li>
							                        <li data-id="3301">昆山</li>
							                        <li data-id="3601">奎屯</li>
							                        <li data-id="7197">喀什</li>
							                        <li data-id="7378">克拉玛依</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="L">L</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="39">丽江</li>
							                        <li data-id="6321">乐山</li>
							                        <li data-id="7121">廊坊</li>
							                        <li data-id="1841">龙岩</li>
							                        <li data-id="2461">洛阳</li>
							                        <li data-id="5524">泸定</li>
							                        <li data-id="2141">荔浦</li>
							                        <li data-id="2341">龙胜</li>
							                        <li data-id="3621">龙脊</li>
							                        <li data-id="3241">连州</li>
							                        <li data-id="3202">兰州</li>
							                        <li data-id="101">拉萨</li>
							                        <li data-id="328">溧阳天目湖</li>
							                        <li data-id="442">庐山</li>
							                        <li data-id="1421">泸沽湖</li>
							                        <li data-id="3961">旅顺</li>
							                        <li data-id="5781">柳园</li>
							                        <li data-id="6742">龙虎山</li>
							                        <li data-id="7319">莱芜</li>
							                        <li data-id="1402">林芝</li>
							                        <li data-id="4721">临汾</li>
							                        <li data-id="301">临安</li>
							                        <li data-id="1461">连云港</li>
							                        <li data-id="2101">荔波</li>
							                        <li data-id="2581">临潼</li>
							                        <li data-id="3701">乐亭</li>
							                        <li data-id="3881">陵水</li>
							                        <li data-id="4581">临海</li>
							                        <li data-id="5421">兰溪</li>
							                        <li data-id="5881">甪直</li>
							                        <li data-id="6281">连城</li>
							                        <li data-id="6485">泸州</li>
							                        <li data-id="6877">辽宁</li>
							                        <li data-id="7265">聊城</li>
							                        <li data-id="7270">吕梁</li>
							                        <li data-id="7282">六安</li>
							                        <li data-id="7302">娄底</li>
							                        <li data-id="7312">辽阳</li>
							                        <li data-id="7313">漯河</li>
							                        <li data-id="7317">丽水</li>
							                        <li data-id="7334">来宾</li>
							                        <li data-id="7354">临夏</li>
							                        <li data-id="7391">临沂</li>
							                        <li data-id="7407">临沧</li>
							                        <li data-id="7419">陇南</li>
							                        <li data-id="7424">柳州</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="M">M</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="6481">绵阳</li>
							                        <li data-id="6491">眉山</li>
							                        <li data-id="3141">绵山</li>
							                        <li data-id="5982">木兰围场</li>
							                        <li data-id="6341">芒市</li>
							                        <li data-id="7583">弥勒</li>
							                        <li data-id="646">梅州</li>
							                        <li data-id="1562">满洲里</li>
							                        <li data-id="83">茂名</li>
							                        <li data-id="2541">莽山</li>
							                        <li data-id="4022">木鱼</li>
							                        <li data-id="4121">牡丹江</li>
							                        <li data-id="6641">湄洲岛</li>
							                        <li data-id="7202">莫尔道嘎</li>
							                        <li data-id="7362">马鞍山</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="N">N</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="33">南京</li>
							                        <li data-id="47">宁波</li>
							                        <li data-id="243">南宁</li>
							                        <li data-id="1362">南浔</li>
							                        <li data-id="6864">内蒙古</li>
							                        <li data-id="6875">宁夏</li>
							                        <li data-id="60">南海</li>
							                        <li data-id="303">宁海</li>
							                        <li data-id="647">南北湖</li>
							                        <li data-id="1301">南昌</li>
							                        <li data-id="1601">南戴河</li>
							                        <li data-id="2161">南沙</li>
							                        <li data-id="2421">南山寺</li>
							                        <li data-id="3121">南澳</li>
							                        <li data-id="5841">南湖</li>
							                        <li data-id="6490">内江</li>
							                        <li data-id="6492">南充</li>
							                        <li data-id="7195">南通</li>
							                        <li data-id="7301">南阳</li>
							                        <li data-id="7316">南平</li>
							                        <li data-id="7366">宁德</li>
							                    </ul>
							                </div>
						                </div>
						                <div>
							                <div className="city-box">
							                    <div className="c-title" id="P">P</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="6879">盘锦</li>
							                        <li data-id="1142">平遥</li>
							                        <li data-id="308">普陀山</li>
							                        <li data-id="7395">普洱</li>
							                        <li data-id="49">普陀</li>
							                        <li data-id="2181">平谷</li>
							                        <li data-id="2542">坪石</li>
							                        <li data-id="6483">攀枝花</li>
							                        <li data-id="6489">彭州</li>
							                        <li data-id="7272">莆田</li>
							                        <li data-id="7321">平凉</li>
							                        <li data-id="7339">濮阳</li>
							                        <li data-id="7371">平顶山</li>
							                        <li data-id="7400">萍乡</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="Q">Q</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="32">青岛</li>
							                        <li data-id="81">清远</li>
							                        <li data-id="304">千岛湖</li>
							                        <li data-id="1221">衢州</li>
							                        <li data-id="6621">泉州</li>
							                        <li data-id="6874">青海</li>
							                        <li data-id="7337">齐齐哈尔</li>
							                        <li data-id="645">曲阜</li>
							                        <li data-id="2422">七仙岭</li>
							                        <li data-id="4621">齐云山</li>
							                        <li data-id="5561">秦皇岛</li>
							                        <li data-id="6488">邛崃</li>
							                        <li data-id="6782">琼海</li>
							                        <li data-id="7322">黔西南</li>
							                        <li data-id="7327">黔东南</li>
							                        <li data-id="7328">曲靖</li>
							                        <li data-id="7352">黔南</li>
							                        <li data-id="7401">庆阳</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="R">R</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="5821">任意城市</li>
							                        <li data-id="6342">瑞丽</li>
							                        <li data-id="3661">日喀则</li>
							                        <li data-id="1061">乳源</li>
							                        <li data-id="3641">日照</li>
							                        <li data-id="5521">日隆</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="S">S</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="3501">上海</li>
							                        <li data-id="3441">深圳</li>
							                        <li data-id="8">三亚</li>
							                        <li data-id="527">韶关</li>
							                        <li data-id="315">绍兴</li>
							                        <li data-id="57">顺德</li>
							                        <li data-id="324">苏州</li>
							                        <li data-id="609">沈阳</li>
							                        <li data-id="1123">山东</li>
							                        <li data-id="6961">三峡</li>
							                        <li data-id="6865">山西</li>
							                        <li data-id="6901">石家庄</li>
							                        <li data-id="16">汕头</li>
							                        <li data-id="461">韶山</li>
							                        <li data-id="4161">三清山</li>
							                        <li data-id="54">汕尾</li>
							                        <li data-id="5441">潥阳</li>
							                        <li data-id="5981">山海关</li>
							                        <li data-id="6702">四川</li>
							                        <li data-id="307">嵊泗</li>
							                        <li data-id="318">嵊州</li>
							                        <li data-id="329">上海郊区</li>
							                        <li data-id="543">四姑娘山</li>
							                        <li data-id="1441">上川岛</li>
							                        <li data-id="2102">三都</li>
							                        <li data-id="2661">蜀南竹海</li>
							                        <li data-id="3101">沈家门</li>
							                        <li data-id="3103">三门</li>
							                        <li data-id="4021">神农架</li>
							                        <li data-id="4543">沙县</li>
							                        <li data-id="5641">邵阳</li>
							                        <li data-id="6221">遂宁</li>
							                        <li data-id="6581">沙坡头</li>
							                        <li data-id="6741">上饶</li>
							                        <li data-id="6872">陕西</li>
							                        <li data-id="7296">神农架林区</li>
							                        <li data-id="7297">商洛</li>
							                        <li data-id="7332">随州</li>
							                        <li data-id="7336">三门峡</li>
							                        <li data-id="7342">宿州</li>
							                        <li data-id="7348">商丘</li>
							                        <li data-id="7353">石嘴山</li>
							                        <li data-id="7363">四平</li>
							                        <li data-id="7379">绥化</li>
							                        <li data-id="7380">山南</li>
							                        <li data-id="7384">三明</li>
							                        <li data-id="7385">十堰</li>
							                        <li data-id="7396">石河子</li>
							                        <li data-id="7416">朔州</li>
							                        <li data-id="7426">宿迁</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="T">T</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="1121">泰安</li>
							                        <li data-id="1141">太原</li>
							                        <li data-id="611">天津</li>
							                        <li data-id="409">同里</li>
							                        <li data-id="841">屯溪</li>
							                        <li data-id="6161">泰州</li>
							                        <li data-id="6361">腾冲</li>
							                        <li data-id="281">吐鲁番</li>
							                        <li data-id="6201">唐山</li>
							                        <li data-id="7351">铜仁</li>
							                        <li data-id="25">台山</li>
							                        <li data-id="311">桃花岛</li>
							                        <li data-id="326">汤山</li>
							                        <li data-id="362">桐庐</li>
							                        <li data-id="3102">天台</li>
							                        <li data-id="4542">泰宁</li>
							                        <li data-id="5461">台州</li>
							                        <li data-id="7299">通辽</li>
							                        <li data-id="7333">铜川</li>
							                        <li data-id="7373">天水</li>
							                        <li data-id="7390">通化</li>
							                        <li data-id="7414">铁岭</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="W">W</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="605">威海</li>
							                        <li data-id="1641">蜈支洲岛</li>
							                        <li data-id="45">武汉</li>
							                        <li data-id="142">乌鲁木齐</li>
							                        <li data-id="325">无锡</li>
							                        <li data-id="43">武夷山</li>
							                        <li data-id="313">乌镇</li>
							                        <li data-id="405">五台山</li>
							                        <li data-id="2401">婺源</li>
							                        <li data-id="7021">芜湖</li>
							                        <li data-id="319">武义</li>
							                        <li data-id="525">武陵源</li>
							                        <li data-id="607">温州</li>
							                        <li data-id="642">梧州</li>
							                        <li data-id="1122">潍坊</li>
							                        <li data-id="4001">武当山</li>
							                        <li data-id="5941">乌兰察布</li>
							                        <li data-id="6781">万宁</li>
							                        <li data-id="7325">武威</li>
							                        <li data-id="7341">文昌</li>
							                        <li data-id="7356">渭南</li>
							                        <li data-id="7386">吴忠</li>
							                        <li data-id="7398">乌兰察布市</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="X">X</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="31">西安</li>
							                        <li data-id="36">厦门</li>
							                        <li data-id="244">香格里拉</li>
							                        <li data-id="1261">西双版纳</li>
							                        <li data-id="3741">兴隆</li>
							                        <li data-id="5523">新都桥</li>
							                        <li data-id="312">西塘</li>
							                        <li data-id="2463">西宁</li>
							                        <li data-id="3041">雪乡</li>
							                        <li data-id="7349">湘西</li>
							                        <li data-id="53">下川岛</li>
							                        <li data-id="6871">西藏</li>
							                        <li data-id="6873">新疆</li>
							                        <li data-id="7273">忻州</li>
							                        <li data-id="20">小梅沙</li>
							                        <li data-id="141">兴义</li>
							                        <li data-id="302">仙居</li>
							                        <li data-id="317">新昌</li>
							                        <li data-id="320">仙都</li>
							                        <li data-id="742">新会</li>
							                        <li data-id="1001">香水湾</li>
							                        <li data-id="1201">象山</li>
							                        <li data-id="3181">新乡</li>
							                        <li data-id="4601">休宁</li>
							                        <li data-id="5921">兴城</li>
							                        <li data-id="6496">西昌</li>
							                        <li data-id="7196">徐州</li>
							                        <li data-id="7277">许昌</li>
							                        <li data-id="7284">邢台</li>
							                        <li data-id="7290">咸宁</li>
							                        <li data-id="7305">兴安盟</li>
							                        <li data-id="7308">襄阳</li>
							                        <li data-id="7310">新余</li>
							                        <li data-id="7311">咸阳</li>
							                        <li data-id="7329">锡林郭勒盟</li>
							                        <li data-id="7331">孝感</li>
							                        <li data-id="7335">宣城</li>
							                        <li data-id="7360">信阳</li>
							                        <li data-id="7382">湘潭</li>
							                        <li data-id="7420">仙桃</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="Y">Y</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="5501">雅安</li>
							                        <li data-id="42">阳朔</li>
							                        <li data-id="30">阳江</li>
							                        <li data-id="621">宜昌</li>
							                        <li data-id="4541">永定</li>
							                        <li data-id="7194">运城</li>
							                        <li data-id="323">扬州</li>
							                        <li data-id="921">亚布力</li>
							                        <li data-id="1241">烟台</li>
							                        <li data-id="2462">银川</li>
							                        <li data-id="6706">云南</li>
							                        <li data-id="7582">元阳</li>
							                        <li data-id="1501">云浮</li>
							                        <li data-id="3583">伊宁</li>
							                        <li data-id="7359">伊犁</li>
							                        <li data-id="306">雁荡山</li>
							                        <li data-id="327">颐尚</li>
							                        <li data-id="365">阳澄湖</li>
							                        <li data-id="606">延吉</li>
							                        <li data-id="622">宜兴</li>
							                        <li data-id="961">阳春</li>
							                        <li data-id="1761">英德</li>
							                        <li data-id="2201">延庆</li>
							                        <li data-id="2482">阳西</li>
							                        <li data-id="3161">云台山</li>
							                        <li data-id="3221">玉山</li>
							                        <li data-id="4741">鹰潭</li>
							                        <li data-id="5401">盐城</li>
							                        <li data-id="5962">野三坡</li>
							                        <li data-id="6181">余杭</li>
							                        <li data-id="6493">宜宾</li>
							                        <li data-id="6501">余姚</li>
							                        <li data-id="7271">延安</li>
							                        <li data-id="7285">营口</li>
							                        <li data-id="7292">永州</li>
							                        <li data-id="7294">益阳</li>
							                        <li data-id="7320">伊春</li>
							                        <li data-id="7340">岳阳</li>
							                        <li data-id="7345">宜春</li>
							                        <li data-id="7346">延边</li>
							                        <li data-id="7369">阳泉</li>
							                        <li data-id="7393">玉林</li>
							                        <li data-id="7402">玉溪</li>
							                        <li data-id="7425">榆林</li>
							                    </ul>
							                </div>
							                <div className="city-box">
							                    <div className="c-title" id="Z">Z</div>
							                    <ul className="c-list clearfix">
							                        <li data-id="9">珠海</li>
							                        <li data-id="1681">郑州</li>
							                        <li data-id="441">中山</li>
							                        <li data-id="102">张家界</li>
							                        <li data-id="84">肇庆</li>
							                        <li data-id="6681">长隆</li>
							                        <li data-id="2121">长春</li>
							                        <li data-id="21">增城</li>
							                        <li data-id="321">周庄</li>
							                        <li data-id="322">镇江</li>
							                        <li data-id="3061">舟山</li>
							                        <li data-id="3721">长白山</li>
							                        <li data-id="4501">中卫</li>
							                        <li data-id="6704">浙江</li>
							                        <li data-id="7286">张掖</li>
							                        <li data-id="7350">遵义</li>
							                        <li data-id="316">诸暨</li>
							                        <li data-id="1661">漳州</li>
							                        <li data-id="1701">湛江</li>
							                        <li data-id="6021">枣庄</li>
							                        <li data-id="6061">朱家角</li>
							                        <li data-id="6081">张家港</li>
							                        <li data-id="6482">自贡</li>
							                        <li data-id="7041">张家口</li>
							                        <li data-id="7287">昭通</li>
							                        <li data-id="7295">长治</li>
							                        <li data-id="7344">淄博</li>
							                        <li data-id="7367">驻马店</li>
							                        <li data-id="7376">株洲</li>
							                        <li data-id="7409">周口</li>
							                    </ul>
							                </div>
							            </div>
							        </div>

							        <a href="javascript:window.scrollTo(0,0)" id="go_top" style={{"display":"block"}}></a>

							    </section>
							</div>
						</div>
					)
				}
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
