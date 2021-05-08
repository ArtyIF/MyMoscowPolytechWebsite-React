import React, { Component } from 'react';

class LoggerFormView extends Component {
    constructor() {
        super();
        this.state = {
            log: '...'
        };
    }

    componentDidMount() {
        fetch('/api/log').then((value) => {
            value.text().then((log) => {
                this.setState({log: log});
            });
        });
    }

    render() {
        if (this.state.log === '') {
            return (
                <div className='height-100'>
                    <h2>Анонимный чат</h2>
                    <p>Эта форма была сделана как результат выполнения 7-й главы 6-й лабораторной работы по РВП. Она отправляет написанное вами ниже в лог на сервере. Лог чистится каждые сутки.</p>
                    <p>Загрузка формы...</p>
                </div>
            );
        }
        return (
            <div className='height-100'>
                <h2>Анонимный чат</h2>
                <p>Эта форма была сделана как результат выполнения 7-й главы 6-й лабораторной работы по РВП. Она отправляет написанное вами ниже в лог на сервере. Лог чистится каждые сутки.</p>
                <form action='/logger/send' method='POST'>
                    <p><input type='text' name='msg' id='msg' placeholder='Введите сюда всё, что захотите. В рамках закона, конечно.' style={{width: 'calc(100% - 32px)'}} required/></p>
                    <p><input type='submit' value='Отправить'/></p>
                </form>
                <h3>Сообщения за день</h3>
                <pre>{this.state.log}</pre>
            </div>
        );
    }
}

export default LoggerFormView;