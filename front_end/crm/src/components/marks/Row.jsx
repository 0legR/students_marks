export const EMPTY_ROW = <tr key={key}>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="text"
				      		defaultValue={mark.all_name}
				      		onChange={this.handlerOnChange}
				      		name="all_name"
				      		onBlur=""
				      		ref={(input) => this.all_name = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[a-zA-Z ]+$/)}
				      	/>
				      </td>
				      <td>
				      	{mark.current_rating}
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="number"
				      		defaultValue={mark.visually}
				      		onChange={this.handlerOnChange}
				      		name="visually"
				      		onBlur=""
				      		ref={(input) => this.visually = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[0-5]$/)}
				      		max="5"
				      		min="0"
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="number"
				      		defaultValue={mark.code}
				      		onChange={this.handlerOnChange}
				      		name="code"
				      		onBlur=""
				      		ref={(input) => this.code = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[0-5]$/)}
				      		max="5"
				      		min="0"
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="number"
				      		defaultValue={mark.explanation}
				      		onChange={this.handlerOnChange}
				      		name="explanation"
				      		onBlur=""
				      		ref={(input) => this.explanation = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[0-5]$/)}
				      		max="5"
				      		min="0"
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="number"
				      		defaultValue={mark.stability}
				      		onChange={this.handlerOnChange}
				      		name="stability"
				      		onBlur=""
				      		ref={(input) => this.stability = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[0-5]$/)}
				      		max="5"
				      		min="0"
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="number"
				      		defaultValue={mark.presentation}
				      		onChange={this.handlerOnChange}
				      		name="presentation"
				      		onBlur=""
				      		ref={(input) => this.presentation = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[0-5]$/)}
				      		max="5"
				      		min="0"
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="number"
				      		defaultValue={mark.questions}
				      		onChange={this.handlerOnChange}
				      		name="questions"
				      		onBlur=""
				      		ref={(input) => this.questions = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[0-5]$/)}
				      		max="5"
				      		min="0"
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="number"
				      		defaultValue={mark.favorite_place}
				      		onChange={this.handlerOnChange}
				      		name="favorite_place"
				      		onBlur=""
				      		ref={(input) => this.favorite_place = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[0-5]$/)}
				      		max="5"
				      		min="0"
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="text"
				      		defaultValue={mark.favoritism}
				      		onChange={this.handlerOnChange}
				      		name="favoritism"
				      		onBlur=""
				      		ref={(input) => this.favoritism = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[!@#$%^&*()_+=<>|./?,-]/)}
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="text"
				      		defaultValue={mark.print_out}
				      		onChange={this.handlerOnChange}
				      		name="print_out"
				      		onBlur=""
				      		ref={(input) => this.print_out = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[!@#$%^&*()_+=<>|./?,-]/)}
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="text"
				      		defaultValue={mark.english_pd}
				      		onChange={this.handlerOnChange}
				      		name="english_pd"
				      		onBlur=""
				      		ref={(input) => this.english_pd = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[!@#$%^&*()_+=<>|./?,-]/)}
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="text"
				      		defaultValue={mark.git}
				      		onChange={this.handlerOnChange}
				      		name="git"
				      		onBlur=""
				      		ref={(input) => this.git = input}
				      		onKeyUp={(e) => e.target.value = e.target.value.match(/^[!@#$%^&*()_+=<>|./?,-]/)}
				      	/>
				      </td>
				      <td>
				      	<input
				      		id={mark.id}
				      		type="text"
				      		defaultValue={mark.notes}
				      		onChange={this.handlerOnChange}
				      		name="notes"
				      		onBlur=""
				      		ref={(input) => this.notes = input}
				      	/>
				      </td>
				    </tr>);