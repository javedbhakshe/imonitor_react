import React, { Component } from 'react';
import { apiServices } from '../../services/apiServices';
import Loader from '../../components/loaders/loader';

class CommunitySetUp extends Component{
	constructor(props){
		super(props);
		
		let communityBO = localStorage.getItem('community');
		let community = JSON.parse(communityBO).community;
		
        this.state = {
			uuid:community.uuid,
            name: community.name,
            emaill: community.emaill,
            type: community.type,
            project: community.project,
            summary: community.summary,
            helpDeskNo: community.helpDeskNo,
			defaultLocale: community.defaultLocale?community.defaultLocale: 'en_US',
			defaultMapView: community.defaultMapView? community.defaultMapView: '',
			logo: community.logo ? community.logo : '',
			featuredImage: community.featuredImage ? community.featuredImage : '',
			isLoading:false			         
		  }   
		  
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
	}

	fileChangedHandler = (e) => {
		const name = e.target.name;
		const file = e.target.files[0];
		
		let that = this;
		apiServices.cloudinaryUpload(file).then(function(response){
			if(response.url){
				that.setState({[name]: response.url});
			}       
		});
	}
	
	handleSubmit(e) {
        e.preventDefault();
        var that = this;  
        this.setState({isLoading : true});          
        if(this.state.name && this.state.emaill){
          let requestOptions = { community: this.state };
          apiServices.createCommunity(requestOptions).then(function(response){
			that.setState({isLoading: false});
            if(response.errors){
              that.setState({activeTab: 'appconfig-tab'});
            }  
            if(response.status === "SUCCESS"){
            //   that.props.configTab();
            }          
          });
        }
    }
	
	render(){
		return(			
			<div className="card">
			<Loader isLoading={this.state.isLoading}/>
			<form onSubmit={this.handleSubmit}>
				<div className="card-body">
					<div className="row">
					<div className="col-lg-6">
						<div className="form-group">
							<label className="control-label">Community Name</label>
							<input type="text"
							 name="name"
							 placeholder="Enter community name"
							 className="form-control"
							 id="community_name"
							 value={this.state.name}
							 onChange={this.handleUserInput} />
						</div>
					</div>
					<div className="col-lg-6">
					    <div className="form-group">
							<label className="control-label">Registered Email</label>
							<input className="form-control"
							 type="email" 
							 name="emaill" 
							 placeholder="Enter Community Registered Email" 
							 id='community_email'
							 disabled
							 value={this.state.emaill}
							 onChange={this.handleUserInput} />
						</div>
					</div>
					<div className="col-lg-6">
					    <div className="form-group">
							<label className="control-label">Project Name</label>
							<input className="form-control"
							 type="text"
							 name="project"
							 placeholder="Enter Project Name" 
							 id='project'
							 value={this.state.project}
							 onChange={this.handleUserInput} />
						</div>
					</div>
					<div className="col-lg-6">
					    <div className="form-group">
							<label className="control-label">Community Type</label>
							<select className="form-control" name="type" value={this.state.type} onChange={this.handleUserInput}>
								<option value="Public Health">Public Health</option>
								<option value="Human Rights">Human Rights</option>
								<option value="Government">Government</option>
								<option value="NGO">NGO</option>
								<option value="SMARTCITIES">SMARTCITIES</option>
								<option value="HIV">HIV</option>
								<option value="TB">TB</option>
								<option value="DISASTER">DISASTER</option>
								<option value="Other">Other</option>
							</select>
						</div>
					</div>
					<div className="col-lg-12">
					    <div className="form-group">
							<label className="control-label">Summary</label>
							<textarea className="form-control" name="summary" placeholder="Enter Summary" row="5" id="community_summary"
							value={this.state.summary} onChange={this.handleUserInput}></textarea>
						</div>
					</div>					
					<div className="col-lg-6">
					    <div className="form-group">
							<label className="control-label">Community Default Language</label>
							<select className="form-control" name="defaultLocale" value={this.state.defaultLocale} onChange={this.handleUserInput}>
								<option value="pl">Polish</option>
								<option value="fi">Finnish</option>
								<option value="da">Danish</option>
								<option value="sr">Serbian</option>
								<option value="mk">Macedonian</option>
								<option value="fr">French</option>
								<option value="th">Thai</option>
								<option value="ar">Arabic</option>
								<option value="lv">Latvian</option>
								<option value="de">German</option>
								<option value="hr">Croatian</option>
								<option value="in">Indonesian</option>
								<option value="ja">Japanese</option>
								<option value="pt">Portuguese</option>
								<option value="is">Icelandic</option>
								<option value="ms">Malay</option>
								<option value="sl">Slovenian</option>
								<option value="es">Spanish</option>
								<option value="bg">Bulgarian</option>
								<option value="sv">Swedish</option>
								<option value="en">English</option>
								<option value="iw">Hebrew</option>
								<option value="zh">Chinese</option>
								<option value="it">Italian</option>
								<option value="uk">Ukrainian</option>
								<option value="ga">Irish</option>
								<option value="no">Norwegian</option>
								<option value="lt">Lithuanian</option>
								<option value="sk">Slovak</option>
								<option value="ru">Russian</option>
								<option value="mt">Maltese</option>
								<option value="nl">Dutch</option>
								<option value="et">Estonian</option>
								<option value="sq">Albanian</option>
								<option value="vi">Vietnamese</option>
								<option value="el">Greek</option>
								<option value="cs">Czech</option>
								<option value="ca">Catalan</option>
								<option value="be">Belarusian</option>
								<option value="sr__#Latn">Serbian (Latin)</option>
								<option value="ko">Korean</option>
								<option value="ro">Romanian</option>
								<option value="tr">Turkish</option>
								<option value="hu">Hungarian</option>
								<option value="sq_AL">Albanian (Albania)</option>
								<option value="ar_DZ">Arabic (Algeria)</option>
								<option value="es_AR">Spanish (Argentina)</option>
								<option value="en_AU">English (Australia)</option>
								<option value="de_AT">German (Austria)</option>
								<option value="ar_BH">Arabic (Bahrain)</option>
								<option value="be_BY">Belarusian (Belarus)</option>
								<option value="nl_BE">Dutch (Belgium)</option>
								<option value="fr_BE">French (Belgium)</option>
								<option value="es_BO">Spanish (Bolivia)</option>
								<option value="sr_BA_#Latn">Serbian (Latin,Bosnia and Herzegovina)</option>
								<option value="sr_BA">Serbian (Bosnia and Herzegovina)</option>
								<option value="pt_BR">Portuguese (Brazil)</option>
								<option value="bg_BG">Bulgarian (Bulgaria)</option>
								<option value="en_CA">English (Canada)</option>
								<option value="fr_CA">French (Canada)</option>
								<option value="es_CL">Spanish (Chile)</option>
								<option value="zh_CN">Chinese (China)</option>
								<option value="es_CO">Spanish (Colombia)</option>
								<option value="es_CR">Spanish (Costa Rica)</option>
								<option value="hr_HR">Croatian (Croatia)</option>
								<option value="el_CY">Greek (Cyprus)</option>
								<option value="cs_CZ">Czech (Czech Republic)</option>
								<option value="da_DK">Danish (Denmark)</option>
								<option value="es_DO">Spanish (Dominican Republic)</option>
								<option value="es_EC">Spanish (Ecuador)</option>
								<option value="ar_EG">Arabic (Egypt)</option>
								<option value="es_SV">Spanish (El Salvador)</option>
								<option value="et_EE">Estonian (Estonia)</option>
								<option value="fi_FI">Finnish (Finland)</option>
								<option value="fr_FR">French (France)</option>
								<option value="de_DE">German (Germany)</option>
								<option value="el_GR">Greek (Greece)</option>
								<option value="es_GT">Spanish (Guatemala)</option>
								<option value="es_HN">Spanish (Honduras)</option>
								<option value="zh_HK">Chinese (Hong Kong)</option>
								<option value="hu_HU">Hungarian (Hungary)</option>
								<option value="is_IS">Icelandic (Iceland)</option>
								<option value="hi_IN">Hindi (India)</option>
								<option value="en_IN">English (India)</option>
								<option value="in_ID">Indonesian (Indonesia)</option>
								<option value="ar_IQ">Arabic (Iraq)</option>
								<option value="ga_IE">Irish (Ireland)</option>
								<option value="en_IE">English (Ireland)</option>
								<option value="iw_IL">Hebrew (Israel)</option>
								<option value="it_IT">Italian (Italy)</option>
								<option value="ja_JP_JP_#u-ca-japanese">Japanese (Japan,JP)</option>
								<option value="ja_JP">Japanese (Japan)</option>
								<option value="ar_JO">Arabic (Jordan)</option>
								<option value="ar_KW">Arabic (Kuwait)</option>
								<option value="lv_LV">Latvian (Latvia)</option>
								<option value="ar_LB">Arabic (Lebanon)</option>
								<option value="ar_LY">Arabic (Libya)</option>
								<option value="lt_LT">Lithuanian (Lithuania)</option>
								<option value="fr_LU">French (Luxembourg)</option>
								<option value="de_LU">German (Luxembourg)</option>
								<option value="mk_MK">Macedonian (Macedonia)</option>
								<option value="ms_MY">Malay (Malaysia)</option>
								<option value="en_MT">English (Malta)</option>
								<option value="mt_MT">Maltese (Malta)</option>
								<option value="es_MX">Spanish (Mexico)</option>
								<option value="sr_ME_#Latn">Serbian (Latin,Montenegro)</option>
								<option value="sr_ME">Serbian (Montenegro)</option>
								<option value="ar_MA">Arabic (Morocco)</option>
								<option value="nl_NL">Dutch (Netherlands)</option>
								<option value="en_NZ">English (New Zealand)</option>
								<option value="es_NI">Spanish (Nicaragua)</option>
								<option value="no_NO">Norwegian (Norway)</option>
								<option value="no_NO_NY">Norwegian (Norway,Nynorsk)</option>
								<option value="ar_OM">Arabic (Oman)</option>
								<option value="es_PA">Spanish (Panama)</option>
								<option value="es_PY">Spanish (Paraguay)</option>
								<option value="es_PE">Spanish (Peru)</option>
								<option value="en_PH">English (Philippines)</option>
								<option value="pl_PL">Polish (Poland)</option>
								<option value="pt_PT">Portuguese (Portugal)</option>
								<option value="es_PR">Spanish (Puerto Rico)</option>
								<option value="ar_QA">Arabic (Qatar)</option>
								<option value="ro_RO">Romanian (Romania)</option>
								<option value="ru_RU">Russian (Russia)</option>
								<option value="ar_SA">Arabic (Saudi Arabia)</option>
								<option value="sr_RS">Serbian (Serbia)</option>
								<option value="sr_RS_#Latn">Serbian (Latin,Serbia)</option>
								<option value="sr_CS">Serbian (Serbia and Montenegro)</option>
								<option value="en_SG">English (Singapore)</option>
								<option value="zh_SG">Chinese (Singapore)</option>
								<option value="sk_SK">Slovak (Slovakia)</option>
								<option value="sl_SI">Slovenian (Slovenia)</option>
								<option value="en_ZA">English (South Africa)</option>
								<option value="ko_KR">Korean (South Korea)</option>
								<option value="es_ES">Spanish (Spain)</option>
								<option value="ca_ES">Catalan (Spain)</option>
								<option value="ar_SD">Arabic (Sudan)</option>
								<option value="sv_SE">Swedish (Sweden)</option>
								<option value="it_CH">Italian (Switzerland)</option>
								<option value="fr_CH">French (Switzerland)</option>
								<option value="de_CH">German (Switzerland)</option>
								<option value="ar_SY">Arabic (Syria)</option>
								<option value="zh_TW">Chinese (Taiwan)</option>
								<option value="th_TH">Thai (Thailand)</option>
								<option value="th_TH_TH_#u-nu-thai">Thai (Thailand,TH)</option>
								<option value="ar_TN">Arabic (Tunisia)</option>
								<option value="tr_TR">Turkish (Turkey)</option>
								<option value="uk_UA">Ukrainian (Ukraine)</option>
								<option value="ar_AE">Arabic (United Arab Emirates)</option>
								<option value="en_GB">English (United Kingdom)</option>
								<option value="es_US">Spanish (United States)</option>
								<option value="en_US" >English (United States)</option>
								<option value="es_UY">Spanish (Uruguay)</option>
								<option value="es_VE">Spanish (Venezuela)</option>
								<option value="vi_VN">Vietnamese (Vietnam)</option>
								<option value="ar_YE">Arabic (Yemen)</option>
							</select>
						</div>
					</div>
					<div className="col-lg-6">
					    <div className="form-group">
							<label className="control-label">Default Map View</label>
							<select className="form-control" name="defaultMapView" value={this.state.defaultMapView} onChange={this.handleUserInput}>
								<option value="" text="World" >World</option>
								<option value="Afghanistan">Afghanistan</option>
								<option value="Albania">Albania</option>
								<option value="Algeria">Algeria</option>
								<option value="American Samoa">American Samoa</option>
								<option value="Andorra">Andorra</option>
								<option value="Angola">Angola</option>
								<option value="Anguilla">Anguilla</option>
								<option value="Antarctica">Antarctica</option>
								<option value="Antigua and Barbuda">Antigua and Barbuda</option>
								<option value="Argentina">Argentina</option>
								<option value="Armenia">Armenia</option>
								<option value="Aruba">Aruba</option>
								<option value="Australia">Australia</option>
								<option value="Austria">Austria</option>
								<option value="Azerbaijan">Azerbaijan</option>
								<option value="Bahamas">Bahamas</option>
								<option value="Bahrain">Bahrain</option>
								<option value="Bangladesh">Bangladesh</option>
								<option value="Barbados">Barbados</option>
								<option value="Belarus">Belarus</option>
								<option value="Belgium">Belgium</option>
								<option value="Belize">Belize</option>
								<option value="Benin">Benin</option>
								<option value="Bermuda">Bermuda</option>
								<option value="Bhutan">Bhutan</option>
								<option value="Bolivia">Bolivia</option>
								<option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>
								<option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
								<option value="Botswana">Botswana</option>
								<option value="Bouvet Island">Bouvet Island</option>
								<option value="Brazil">Brazil</option>
								<option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
								<option value="British Virgin Islands">British Virgin Islands</option>
								<option value="Brunei">Brunei</option>
								<option value="Bulgaria">Bulgaria</option>
								<option value="Burkina Faso">Burkina Faso</option>
								<option value="Burundi">Burundi</option>
								<option value="Cambodia">Cambodia</option>
								<option value="Cameroon">Cameroon</option>
								<option value="Canada">Canada</option>
								<option value="Cape Verde">Cape Verde</option>
								<option value="Cayman Islands">Cayman Islands</option>
								<option value="Central African Republic">Central African Republic</option>
								<option value="Chad">Chad</option>
								<option value="Chile">Chile</option>
								<option value="China">China</option>
								<option value="Christmas Island">Christmas Island</option>
								<option value="Cocos Islands">Cocos Islands</option>
								<option value="Colombia">Colombia</option>
								<option value="Comoros">Comoros</option>
								<option value="Congo">Congo</option>
								<option value="Cook Islands">Cook Islands</option>
								<option value="Costa Rica">Costa Rica</option>
								<option value="Croatia">Croatia</option>
								<option value="Cuba">Cuba</option>
								<option value="Curaçao">Curaçao</option>
								<option value="Cyprus">Cyprus</option>
								<option value="Czech Republic">Czech Republic</option>
								<option value="Côte d&#39;Ivoire">Côte d'Ivoire</option>
								<option value="Denmark">Denmark</option>
								<option value="Djibouti">Djibouti</option>
								<option value="Dominica">Dominica</option>
								<option value="Dominican Republic">Dominican Republic</option>
								<option value="Ecuador">Ecuador</option>
								<option value="Egypt">Egypt</option>
								<option value="El Salvador">El Salvador</option>
								<option value="Equatorial Guinea">Equatorial Guinea</option>
								<option value="Eritrea">Eritrea</option>
								<option value="Estonia">Estonia</option>
								<option value="Ethiopia">Ethiopia</option>
								<option value="Falkland Islands">Falkland Islands</option>
								<option value="Faroe Islands">Faroe Islands</option>
								<option value="Fiji">Fiji</option>
								<option value="Finland">Finland</option>
								<option value="France">France</option>
								<option value="French Guiana">French Guiana</option>
								<option value="French Polynesia">French Polynesia</option>
								<option value="French Southern Territories">French Southern Territories</option>
								<option value="Gabon">Gabon</option>
								<option value="Gambia">Gambia</option>
								<option value="Georgia">Georgia</option>
								<option value="Germany">Germany</option>
								<option value="Ghana">Ghana</option>
								<option value="Gibraltar">Gibraltar</option>
								<option value="Greece">Greece</option>
								<option value="Greenland">Greenland</option>
								<option value="Grenada">Grenada</option>
								<option value="Guadeloupe">Guadeloupe</option>
								<option value="Guam">Guam</option>
								<option value="Guatemala">Guatemala</option>
								<option value="Guernsey">Guernsey</option>
								<option value="Guinea">Guinea</option>
								<option value="Guinea-Bissau">Guinea-Bissau</option>
								<option value="Guyana">Guyana</option>
								<option value="Haiti">Haiti</option>
								<option value="Heard Island And McDonald Islands">Heard Island And McDonald Islands</option>
								<option value="Honduras">Honduras</option>
								<option value="Hong Kong">Hong Kong</option>
								<option value="Hungary">Hungary</option>
								<option value="Iceland">Iceland</option>
								<option value="India">India</option>
								<option value="Indonesia">Indonesia</option>
								<option value="Iran">Iran</option>
								<option value="Iraq">Iraq</option>
								<option value="Ireland">Ireland</option>
								<option value="Isle Of Man">Isle Of Man</option>
								<option value="Israel">Israel</option>
								<option value="Italy">Italy</option>
								<option value="Jamaica">Jamaica</option>
								<option value="Japan">Japan</option>
								<option value="Jersey">Jersey</option>
								<option value="Jordan">Jordan</option>
								<option value="Kazakhstan">Kazakhstan</option>
								<option value="Kenya">Kenya</option>
								<option value="Kiribati">Kiribati</option>
								<option value="Kuwait">Kuwait</option>
								<option value="Kyrgyzstan">Kyrgyzstan</option>
								<option value="Laos">Laos</option>
								<option value="Latvia">Latvia</option>
								<option value="Lebanon">Lebanon</option>
								<option value="Lesotho">Lesotho</option>
								<option value="Liberia">Liberia</option>
								<option value="Libya">Libya</option>
								<option value="Liechtenstein">Liechtenstein</option>
								<option value="Lithuania">Lithuania</option>
								<option value="Luxembourg">Luxembourg</option>
								<option value="Macao">Macao</option>
								<option value="Macedonia">Macedonia</option>
								<option value="Madagascar">Madagascar</option>
								<option value="Malawi">Malawi</option>
								<option value="Malaysia">Malaysia</option>
								<option value="Maldives">Maldives</option>
								<option value="Mali">Mali</option>
								<option value="Malta">Malta</option>
								<option value="Marshall Islands">Marshall Islands</option>
								<option value="Martinique">Martinique</option>
								<option value="Mauritania">Mauritania</option>
								<option value="Mauritius">Mauritius</option>
								<option value="Mayotte">Mayotte</option>
								<option value="Mexico">Mexico</option>
								<option value="Micronesia">Micronesia</option>
								<option value="Moldova">Moldova</option>
								<option value="Monaco">Monaco</option>
								<option value="Mongolia">Mongolia</option>
								<option value="Montenegro">Montenegro</option>
								<option value="Montserrat">Montserrat</option>
								<option value="Morocco">Morocco</option>
								<option value="Mozambique">Mozambique</option>
								<option value="Myanmar">Myanmar</option>
								<option value="Namibia">Namibia</option>
								<option value="Nauru">Nauru</option>
								<option value="Nepal">Nepal</option>
								<option value="Netherlands">Netherlands</option>
								<option value="Netherlands Antilles">Netherlands Antilles</option>
								<option value="New Caledonia">New Caledonia</option>
								<option value="New Zealand">New Zealand</option>
								<option value="Nicaragua">Nicaragua</option>
								<option value="Niger">Niger</option>
								<option value="Nigeria">Nigeria</option>
								<option value="Niue">Niue</option>
								<option value="Norfolk Island">Norfolk Island</option>
								<option value="North Korea">North Korea</option>
								<option value="Northern Mariana Islands">Northern Mariana Islands</option>
								<option value="Norway">Norway</option>
								<option value="Oman">Oman</option>
								<option value="Pakistan">Pakistan</option>
								<option value="Palau">Palau</option>
								<option value="Palestine">Palestine</option>
								<option value="Panama">Panama</option>
								<option value="Papua New Guinea">Papua New Guinea</option>
								<option value="Paraguay">Paraguay</option>
								<option value="Peru">Peru</option>
								<option value="Philippines">Philippines</option>
								<option value="Pitcairn">Pitcairn</option>
								<option value="Poland">Poland</option>
								<option value="Portugal">Portugal</option>
								<option value="Puerto Rico">Puerto Rico</option>
								<option value="Qatar">Qatar</option>
								<option value="Reunion">Reunion</option>
								<option value="Romania">Romania</option>
								<option value="Russia">Russia</option>
								<option value="Rwanda">Rwanda</option>
								<option value="Saint Barthélemy">Saint Barthélemy</option>
								<option value="Saint Helena">Saint Helena</option>
								<option value="Saint Kitts And Nevis">Saint Kitts And Nevis</option>
								<option value="Saint Lucia">Saint Lucia</option>
								<option value="Saint Martin">Saint Martin</option>
								<option value="Saint Pierre And Miquelon">Saint Pierre And Miquelon</option>
								<option value="Saint Vincent And The Grenadines">Saint Vincent And The Grenadines</option>
								<option value="Samoa">Samoa</option>
								<option value="San Marino">San Marino</option>
								<option value="Sao Tome And Principe">Sao Tome And Principe</option>
								<option value="Saudi Arabia">Saudi Arabia</option>
								<option value="Senegal">Senegal</option>
								<option value="Serbia">Serbia</option>
								<option value="Serbia and Montenegro">Serbia and Montenegro</option>
								<option value="Seychelles">Seychelles</option>
								<option value="Sierra Leone">Sierra Leone</option>
								<option value="Singapore">Singapore</option>
								<option value="Sint Maarten (Dutch part)">Sint Maarten (Dutch part)</option>
								<option value="Slovakia">Slovakia</option>
								<option value="Slovenia">Slovenia</option>
								<option value="Solomon Islands">Solomon Islands</option>
								<option value="Somalia">Somalia</option>
								<option value="South Africa">South Africa</option>
								<option value="South Georgia And The South Sandwich Islands">South Georgia And The South Sandwich Islands</option>
								<option value="South Korea">South Korea</option>
								<option value="Spain">Spain</option>
								<option value="Sri Lanka">Sri Lanka</option>
								<option value="Sudan">Sudan</option>
								<option value="Suriname">Suriname</option>
								<option value="Svalbard And Jan Mayen">Svalbard And Jan Mayen</option>
								<option value="Swaziland">Swaziland</option>
								<option value="Sweden">Sweden</option>
								<option value="Switzerland">Switzerland</option>
								<option value="Syria">Syria</option>
								<option value="Taiwan">Taiwan</option>
								<option value="Tajikistan">Tajikistan</option>
								<option value="Tanzania">Tanzania</option>
								<option value="Thailand">Thailand</option>
								<option value="The Democratic Republic Of Congo">The Democratic Republic Of Congo</option>
								<option value="Timor-Leste">Timor-Leste</option>
								<option value="Togo">Togo</option>
								<option value="Tokelau">Tokelau</option>
								<option value="Tonga">Tonga</option>
								<option value="Trinidad and Tobago">Trinidad and Tobago</option>
								<option value="Tunisia">Tunisia</option>
								<option value="Turkey">Turkey</option>
								<option value="Turkmenistan">Turkmenistan</option>
								<option value="Turks And Caicos Islands">Turks And Caicos Islands</option>
								<option value="Tuvalu">Tuvalu</option>
								<option value="U.S. Virgin Islands">U.S. Virgin Islands</option>
								<option value="Uganda">Uganda</option>
								<option value="Ukraine">Ukraine</option>
								<option value="United Arab Emirates">United Arab Emirates</option>
								<option value="United Kingdom">United Kingdom</option>
								<option value="United States">United States</option>
								<option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
								<option value="Uruguay">Uruguay</option>
								<option value="Uzbekistan">Uzbekistan</option>
								<option value="Vanuatu">Vanuatu</option>
								<option value="Vatican">Vatican</option>
								<option value="Venezuela">Venezuela</option>
								<option value="Vietnam">Vietnam</option>
								<option value="Wallis And Futuna">Wallis And Futuna</option>
								<option value="Western Sahara">Western Sahara</option>
								<option value="Yemen">Yemen</option>
								<option value="Zambia">Zambia</option>
								<option value="Zimbabwe">Zimbabwe</option>
								<option value="Åland Islands">Åland Islands</option>
							</select>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="form-group">
							<label className="control-label">Helpdesk Number</label>
							<input type="text" name="helpDeskNo" placeholder="Enter Helpdesk Number" className="form-control" id="community_helpdesknumber"
							value={this.state.helpDeskNo} onChange={this.handleUserInput} />
						</div>
					</div>
					<div className="col-lg-6">
					
					</div>
					<div className="col-lg-3">
						<div className="form-group">
							<label>Logo</label>
							<input type="file" name="logo" className="communityLogo_fileupload form-control-file" accept=".jpg, .jpeg, .png"
							onChange={this.fileChangedHandler} />
						</div>
					</div>
					<div className="col-lg-3 logoThumbnails text-right">
						<img src={this.state.logo} className="img-responsive noImage"
						onError={(e) => {
							e.target.src = require("../../assets/images/no-image.png") // default image
						 }}
						  />
					</div>
					<div className="col-lg-3">
						<div className="form-group">
							<label>Featured Image</label>
							<input type="file" name="featuredImage" className="feauturedImage_fileupload form-control-file" 
							onChange={this.fileChangedHandler} />
						</div>
					</div>
					<div className="col-lg-3 fIThumbnails text-right">
						<img src={this.state.featuredImage} className="img-responsive noImage"
						 onError={(e) => {
							e.target.src = require("../../assets/images/no-image.png") // default image
						 }}
						  />
					</div>
					</div>
				</div>
				<div className="text-center card-footer">
					<button type="submit" className="mr-3 btn btn-primary btn-sm"><i className="fa fa-dot-circle-o"></i> Save and Continue </button>
					{/* <button type="reset" className="btn btn-danger btn-sm"><i className="fa fa-ban "></i> Reset</button> */}
				</div>
			</form>
			</div>			
		);
	}
}

export default CommunitySetUp;