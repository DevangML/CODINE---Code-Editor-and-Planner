import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SidebarLink = styled(Link)`
	display: flex;
	color: #e1e9fc;
	justify-content: space-between;
	align-items: center;
	padding: 3.22vw;
	list-style: none;
	height: 9.66vh;
	text-decoration: none;
	font-size: 3.9vh;
	@media only screen and (min-aspect-ratio: 10/3) {
		margin-bottom: -8vh;
		font-size: 5vh;
	}

	&:hover {
		background: #252831;
		color: white;
		border-left: 0.644vh solid #632ce4;
		cursor: pointer;
	}
`

const SidebarLabel = styled.span`
	margin-left: 1.29vw;
`

const DropdownLink = styled(Link)`
	background: #414757;
	height: 9.66vh;
	padding-left: 4.7vw;
	padding-right: 1vw;
	display: flex;
	align-items: center;
	text-decoration: none;
	color: #f5f5f5;
	font-size: 1.9vw;
	&:hover {
		background: #632ce4;
		color: white;
		cursor: pointer;
	}
`

const SubMenu = ({ item }) => {
	const [subnav, setSubnav] = useState(false)

	const showSubnav = () => setSubnav(!subnav)

	return (
		<>
			<SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
				<div>
					{item.icon}
					<SidebarLabel>{item.title}</SidebarLabel>
				</div>
				<div>
					{item.subNav && subnav
						? item.iconOpened
						: item.subNav
						? item.iconClosed
						: null}
				</div>
			</SidebarLink>
			{subnav &&
				item.subNav.map((item, index) => {
					return (
						<DropdownLink to={item.path} key={index}>
							{item.icon}
							<SidebarLabel>{item.title}</SidebarLabel>
						</DropdownLink>
					)
				})}
		</>
	)
}

export default SubMenu
