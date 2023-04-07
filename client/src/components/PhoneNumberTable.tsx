import { FormattedMessage } from "react-intl";
import { IPhoneNumber } from "../store";
import parseDate from "../utils/parseDate";
import "../styles/phone-number.css";

type PhoneNumberTableProps = {
	phoneNumber: IPhoneNumber;
};

export default function PhoneNumberTable({
	phoneNumber,
}: PhoneNumberTableProps) {
	return (
		<table className="phone-number-table">
			<tbody>
				<tr className="phone-number-table__row">
					<th className="phone-number-table__header">
						<FormattedMessage id="phone_number.carrier" />
					</th>
					<td className="phone-number-table__cell">
						{phoneNumber.carrier}
					</td>
				</tr>
				<tr className="phone-number-table__row">
					<th className="phone-number-table__header">
						<FormattedMessage id="phone_number.country_code" />
					</th>
					<td className="phone-number-table__cell">
						{phoneNumber.country_code}
					</td>
				</tr>
				<tr className="phone-number-table__row">
					<th className="phone-number-table__header">
						<FormattedMessage id="phone_number.country_name" />
					</th>
					<td className="phone-number-table__cell">
						{phoneNumber.country_name}
					</td>
				</tr>
				<tr className="phone-number-table__row">
					<th className="phone-number-table__header">
						<FormattedMessage id="phone_number.country_prefix" />
					</th>
					<td className="phone-number-table__cell">
						{phoneNumber.country_prefix}
					</td>
				</tr>
				<tr className="phone-number-table__row">
					<th className="phone-number-table__header">
						<FormattedMessage id="phone_number.international_format" />
					</th>
					<td className="phone-number-table__cell">
						{phoneNumber.international_format}
					</td>
				</tr>
				<tr className="phone-number-table__row">
					<th className="phone-number-table__header">
						<FormattedMessage id="phone_number.line_type" />
					</th>
					<td className="phone-number-table__cell">
						{phoneNumber.line_type}
					</td>
				</tr>
				<tr className="phone-number-table__row">
					<th className="phone-number-table__header">
						<FormattedMessage id="phone_number.local_format" />
					</th>
					<td className="phone-number-table__cell">
						{phoneNumber.local_format}
					</td>
				</tr>
				<tr className="phone-number-table__row">
					<th className="phone-number-table__header">
						<FormattedMessage id="phone_number.location" />
					</th>
					<td className="phone-number-table__cell">
						{phoneNumber.location}
					</td>
				</tr>
				<tr className="phone-number-table__row">
					<th className="phone-number-table__header">
						<FormattedMessage id="phone_number.number" />
					</th>
					<td className="phone-number-table__cell">
						{phoneNumber.number}
					</td>
				</tr>
				<tr className="phone-number-table__row">
					<th className="phone-number-table__header">
						<FormattedMessage id="phone_number.valid" />
					</th>
					<td className="phone-number-table__cell">
						{phoneNumber.valid ? "true" : "false"}
					</td>
				</tr>
				<tr className="phone-number-table__row">
					<th className="phone-number-table__header">
						<FormattedMessage id="phone_number.date" />
					</th>
					<td className="phone-number-table__cell">
						{parseDate(phoneNumber.date)}
					</td>
				</tr>
			</tbody>
		</table>
	);
}
