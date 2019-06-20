package com.fescotech.apps.olentry.common;

public interface BizConstants {
	/**用户状态-开启**/
	public final static Integer USER_STATUS_OPEN = 1;
 
	/**用户状态-锁定**/
	public final static Integer USER_STATUS_LOCKED = 2;
	/**用户状态-关闭**/
	public final static Integer USER_STATUS_CLOSED = 3;
 
	/**默认当前公司Id**/
	public final static Integer CURRENT_CORP_ID=1;
	
	

	/**
	 * 菜单类型
	 */
    public enum MenuType {
        /**
         * 目录
         */
    	CATALOG(0),
        /**
         * 菜单
         */
        MENU(1),
        /**
         * 按钮
         */
        BUTTON(2);

        private int value;

        private MenuType(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }
    }
    
    /**
     * 定时任务状态
     * 
     */
    public enum ScheduleStatus {
        /**
         * 正常
         */
    	NORMAL(0),
        /**
         * 暂停
         */
    	PAUSE(1);

        private int value;

        private ScheduleStatus(int value) {
            this.value = value;
        }
        
        public int getValue() {
            return value;
        }
    }
}