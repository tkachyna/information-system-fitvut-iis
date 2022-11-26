import React, { Component, useContext } from 'react'

const AboutPage = () => {

    return (
        <table style={{marginLeft: 16}}>
            <tbody>
                <tr>
                    <td style={{color: "#2074d4"}}>
                        <h2>Projekt v rámci předmětu IIS 22/23Z na VUT FIT v Brně</h2>
                    </td>
                </tr>
                <tr>
                    <td>
                    Úkolem zadání je vytvořit informační systém pro hlášení problémů a závad odhalených obyvateli města (např. nefunkční pouliční lampa). Každý problém je reprezentován tiketem, který je jednoznačně identifikovatelný, má název, popis, stav, autora, apod. Pro ilustrativnost je k tiketu možné přikládat obrázky, průběžně přidávat komentáře a měnit jeho stav. Tiket slouží pro komunikaci mezi zákazníkem a správcem města, který na základě podstaty problému může vytvářet servisní požadavky a ty přiřazovat servisním pracovníkům (např. výměna žárovky v lampě apod.). Servisní požadavky obsahují popis, předpokládaný čas řešení, stav řešení, vykázaný čas apod. Na základě vyřešení úkolů pak správce města aktualizuje stav tiketu a informuje tím obyvatele o stavu řešení (řešení, čeká na vyjádření, vyřešeno, zamítnuto, apod.). Uživatelé budou moci dále informační systém používat následujícím způsobem:
                    </td>
                </tr>
                <tr>
                    <td style={{color: "#2074d4"}}>
                        <h3>Řešitelé:</h3>
                    </td>
                </tr>
                <tr>
                <td style={{color: "#64666b"}}>
                        <b>Tadeáš Kachyňa (vedoucí týmu)</b>
                    </td>
                </tr>
                <tr>
                    <td>
                         - <b>frontend</b>, <b>backend</b> (autentizace, autorizace),  zprovoznění vzdáleného serveru
                    </td>
                </tr>
                <tr>
                <td style={{color: "#64666b"}}>
                        <b>Lada Krofingerová</b>
                    </td>
                </tr>
                <tr>
                    <td>
                        - <b>backend</b> (API, databáze, modely)
                    </td>
                </tr>
                <tr>
                    <td style={{color: "#64666b"}}>
                        <b>Lucia Makaiová</b>
                    </td>
                </tr>
                <tr>
                    <td>
                        - <b>backend</b> (API, databáze, správa rolí), sprovoznění databáze na serveru
                    </td>
                </tr>
                <tr>
                    <td style={{color: "#2074d4"}}>
                        <h3>Použité technologie:</h3>
                    </td>
                </tr>
                <tr>
                    <td>
                        Django
                    </td>
                </tr>
                <tr>
                    <td>
                        ReactJS
                    </td>
                </tr>
                <tr>
                    <td>
                        SQLAlchemy
                    </td>
                </tr>
                <tr>
                    <td>
                        PostgreSQL
                    </td>
                </tr>
                <tr>
                    <td>
                        Heroku
                    </td>
                </tr>
            </tbody>
        </table>
    )
  }

export default AboutPage